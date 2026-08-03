export declare function readReconAssetFromLocal(path: string): Promise<{
    body: NonSharedBuffer;
    contentType: string;
    source: "local";
}>;
