type ReconAssetStore = "local" | "r2";
type ReconAssetRead = {
    body: Uint8Array;
    contentType: string;
    source: ReconAssetStore;
};
export declare function getReconAssetContentType(path: string): "image/svg+xml; charset=utf-8" | "image/png" | "image/jpeg" | "image/webp" | "application/octet-stream";
export declare function isReconAssetKey(path: string): boolean;
export declare function readReconAsset(path: string): Promise<ReconAssetRead>;
export {};
