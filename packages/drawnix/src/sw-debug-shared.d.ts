declare module '/sw-debug/shared/backup-core.js' {
  export const BACKUP_SIGNATURE: string;
  export const BACKUP_VERSION: number;
  export const MIN_SUPPORTED_BACKUP_VERSION: number;

  export function getExtensionFromMimeType(mimeType: string): string;
  export function getCandidateExtensions(mimeType?: string): string[];
  export function normalizeBackupAssetType(type?: string, mimeType?: string): 'IMAGE' | 'VIDEO' | 'AUDIO';
  export function normalizeCacheMediaType(type?: string, mimeType?: string): 'image' | 'video' | 'audio';
  export function sanitizeFileName(name: string): string;
  export function generateIdFromUrl(url: string): string;
  export function appendUrlHashToBackupName(baseName: string, url?: string): string;
  export function ensureUniqueBackupName(baseName: string, usedNames: Set<string>): string;
  export function hasExportableTaskMedia(result: unknown): boolean;
  export function formatTimestampForFilename(timestamp?: number): string;
  export function buildAssetExportBaseName(assetId: string, createdAt?: number): string;
  export function mergePromptData(data: Record<string, unknown>): Record<string, unknown>;
  export function filterCompletedMediaTasks(allTasks?: unknown[]): unknown[];
  export function validateBackupManifest(manifest: unknown, options?: Record<string, unknown>): unknown;
  export function buildFolderPathMap(folders?: Array<{ id: string; name: string; parentId?: string | null }>): Map<string, string>;
  export function collectFolderPathsFromBoardPaths(boardPaths?: string[]): string[];
  export function getFolderDepth(
    folder: { parentId?: string | null } | undefined,
    folderMap: Map<string, { parentId?: string | null }>
  ): number;
  export function sortFoldersByDepth<T extends { id: string; name: string; parentId?: string | null; order?: number }>(folders?: T[]): T[];
  export function getFolderKey(name: string, parentId?: string | null): string;
  export function findBinaryFile(
    assetsFolder: { file(path: string): unknown },
    metaRelativePath: string,
    mimeType?: string
  ): unknown;
  export function exportKnowledgeBaseData(adapter: unknown): Promise<unknown>;
  export function importKnowledgeBaseData(data: unknown, adapter: unknown): Promise<{
    dirCount: number;
    noteCount: number;
    tagCount: number;
    imageCount: number;
  }>;
}

declare module '/sw-debug/shared/backup-part-manager-core.js' {
  export const PART_SIZE_THRESHOLD: number;

  export class SharedBackupPartManager {
    partIndex: number;
    currentZip: unknown;
    currentSize: number;
    downloadedParts: Array<{ filename: string; size: number }>;
    part1Zip: unknown;

    constructor(baseFilename: string, backupId: string, options?: Record<string, unknown>);
    addFile(path: string, content: unknown): void;
    addAssetBlob(
      path: string,
      blob: Blob,
      metaPath: string,
      metaContent: unknown,
      createdAt?: number
    ): Promise<void>;
    finalizePart(): Promise<void>;
    startNewPart(): void;
    finalizeAll(manifest: unknown): Promise<{
      files: Array<{ filename: string; size: number }>;
      totalParts: number;
      stats?: unknown;
    }>;
  }
}
