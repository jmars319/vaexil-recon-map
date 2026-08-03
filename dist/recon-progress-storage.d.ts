export declare function getProgressStorageKey(title: string): string;
export declare function readProgressSnapshot(storageKey: string): string;
export declare function parseProgressSnapshot(snapshot: string): Set<string>;
export declare function writeProgressSnapshot(storageKey: string, markerIds: Set<string>): void;
export declare function subscribeToProgressStorage(storageKey: string, onStoreChange: () => void): () => void;
