# 图片生成 API 参数兼容性与比例转换修复经验

## 问题概述

本次修复涉及三个关联问题：

1. **rix API 400 错误**：`response_format` 参数不被 rix API 支持，导致图片生成失败
2. **非 1:1 比例全部生成 1:1**：用户选择 16:9、4:3 等比例时，API 实际生成的都是正方形图片
3. **图片插入画布后强制 1:1 显示**：`foreignObject` 容器始终为 400x400，竖版长图被压缩

## 问题 1：`response_format` 硬编码导致 rix API 报错

### 错误日志

```
[TaskQueueService] Task execution failed: Error: Image generation failed: 400 -
{"error":{"message":"Unknown parameter: 'response_format'.","type":"rix_api_error",
"param":"response_format","code":"unknown_parameter"}}
```

### 根本原因

`buildImageRequestBody` 在 [image-api.ts#L60] 硬编码了 `response_format: 'url'`：

```typescript
const body: Record<string, unknown> = {
  prompt: params.prompt,
  model: params.model,
  response_format: 'url',   // ← rix API 不支持
};
```

该参数是 OpenAI 官方 API 的专用参数。当请求路由到 rix API 提供商时，该参数不被识别，返回 400 错误。

### 修复

删除硬编码的 `response_format: 'url'`。各适配器（如 `gpt-image-adapter.ts`）已有自己的 `response_format` 处理逻辑。

```typescript
const body: Record<string, unknown> = {
  prompt: params.prompt,
  model: params.model,
};
```

### 影响范围

- **文件**：`packages/drawnix/src/services/media-api/image-api.ts`
- **调用者**：`fallback-executor.ts` L267、`image-api.ts` L151（`generateImageSync`）
- **非本次修改引入**：该硬编码为项目预存代码，只在使用 rix API 时触发

---

## 问题 2：非 1:1 比例全部生成 1:1

### 现象

用户选择 16:9 比例，但 API 生成的图片是 816x816 正方形，下方内容为空白。

### 根因分析：参数链路断裂

**完整链路**：

```
用户选 16:9
  → normalizeSize('16:9') → '16x9'
  → ParsedGenerationParams.size = '16x9'
  → step.args.size = '16x9'
  → workflow engine: options.size = '16x9'
  → image-generation-service: executorParams.size = '16x9'
  → fallback-executor: params.size = '16x9'
  → buildImageRequestBody({ size: '16x9' })
  → body.size = '16x9'                          ← BUG：比例字符串当作像素尺寸
  → API 收到 size: '16x9'                       ← 无效像素尺寸，回退默认 1:1
```

### 根本原因

`buildImageRequestBody` 对 `size` 和 `aspectRatio` 的处理逻辑有缺陷：

```typescript
// 修复前
if (params.size) {
  body.size = params.size;           // 直接透传，不检查是否是比例格式
} else if (params.aspectRatio) {
  body.size = aspectRatioToSize(params.aspectRatio);  // 这条分支本应做转换
}
```

上游链路将比例格式（如 `'16x9'`）当作 `size` 传入，导致 `aspectRatioToSize` 转换分支被跳过。`'16x9'` 对 API 来说不是合法像素尺寸，API 默认回退为 1:1。

### 受影响的全部比例

| 用户选择 | normalizeSize 后 | 期望像素尺寸 | 实际生成 |
|---------|-----------------|-------------|---------|
| 16:9 | `16x9` | `1792x1024` | 1:1 |
| 9:16 | `9x16` | `1024x1792` | 1:1 |
| 4:3 | `4x3` | `1536x1152` | 1:1 |
| 3:4 | `3x4` | `1152x1536` | 1:1 |
| 3:2 | `3x2` | `1536x1024` | 1:1 |
| 2:3 | `2x3` | `1024x1536` | 1:1 |
| 4:5 | `4x5` | `1024x1280` | 1:1 |
| 5:4 | `5x4` | `1280x1024` | 1:1 |
| 21:9 | `21x9` | `1792x768` | 1:1 |
| 1:4 | `1x4` | `512x2048` | 1:1 |
| 4:1 | `4x1` | `2048x512` | 1:1 |

仅 `1:1` → `1x1` → `1024x1024` 碰巧正常。

### 修复

```typescript
// 修复后
if (params.size) {
  body.size = aspectRatioToSize(params.size) || params.size;
  //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //          先尝试转换比例格式 → 像素尺寸
  //          转换失败（已是像素尺寸）则透传原值
} else if (params.aspectRatio) {
  body.size = aspectRatioToSize(params.aspectRatio);
}
```

`aspectRatioToSize` 内部逻辑：
- 输入 `'16x9'` → 查表返回 `'1792x1024'`
- 输入 `'1024x1024'` → 表中无此键，返回 `undefined` → 回退为原值 `'1024x1024'`

### 影响范围

- **文件**：`packages/drawnix/src/services/media-api/image-api.ts`
- **映射表**：`packages/drawnix/src/services/media-api/utils.ts` - `ASPECT_RATIO_TO_SIZE`

---

## 问题 3：图片插入画布后 1:1 强制显示

### 现象

`foreignObject` 容器始终为 400x400，竖版长图被压缩成正方形。图片加载瞬间比例正确，但随即缩为 1:1。

### 根本原因

`insertImageFromUrl` 的 `lockReferenceDimensions` 参数被设为 `true`，导致图片即使加载完成后也不会根据真实尺寸更新：

```typescript
// 修复前
shouldUpdateSizeAfterLoad = !lockReferenceDimensions; // false → 不更新
```

### 修复

将 `lockReferenceDimensions` 改为 `false`，插入后异步加载真实图片尺寸并更新元素：

**`canvas-insertion.ts`**（批量插入）：
```typescript
await insertImageFromUrl(board, imageUrl, point, false, size, true, true, false, true);
//                                                         lockReferenceDimensions ^^^^^ false
```

**`handler.ts`**（SW 自动插入）：
```typescript
await insertImageFromUrl(board, content, currentPoint, false, { width: 400, height: 400 }, false, true, false, true);
//                                                          lockReferenceDimensions ^^^^^ false
```

### 尺寸更新机制

`updateImageSizeAfterLoad` 函数在图片加载完成后：
1. 获取图片 `naturalWidth` / `naturalHeight`
2. 计算实际宽高比与参考宽高比的差异（< 1% 跳过）
3. 以参考宽度为基准重新计算高度
4. 通过 `Transforms.setNode` 更新元素的 `points`（影响 `foreignObject` 尺寸）

### 注意事项

- 初始插入时 `foreignObject` 仍为 400x400（参考尺寸），图片加载完成后异步更新
- 图片 URL 通过 Service Worker 缓存时可能加载失败，控制台会出现 `[updateImageSizeAfterLoad] Failed to load image` 警告

---

## 架构变更总结

### 影响的核心文件

| 文件 | 修改内容 |
|------|---------|
| `packages/drawnix/src/services/media-api/image-api.ts` | 删除 `response_format` 硬编码；`size` 参数增加比例格式自动转换 |
| `packages/drawnix/src/services/canvas-operations/canvas-insertion.ts` | `lockReferenceDimensions: false` |
| `packages/drawnix/src/services/sw-capabilities/handler.ts` | `lockReferenceDimensions: false`（2 处） |

### 关键设计原则

1. **参数兼容性**：API 请求参数应根据目标提供商动态调整，不应硬编码特定于某个提供商的参数
2. **比例与像素尺寸分离**：`size` 字段可以同时承载"像素尺寸"和"比例格式"两种语义，需要在 API 边界层统一转换为像素尺寸
3. **异步尺寸更新**：`lockReferenceDimensions=false` 配合 `updateImageSizeAfterLoad` 实现图片插入后的自动尺寸适配

### 非本次修改引入

上述问题均为项目预存代码问题，非近期修改引入。具体表现为：
- `response_format: 'url'` 自 `buildImageRequestBody` 函数创建时就存在
- `size` 参数转换缺陷也是原始设计中对上游参数格式假设不一致导致
- `lockReferenceDimensions=true` 是此前某次修改的默认值设置