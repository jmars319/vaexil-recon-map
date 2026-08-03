"use client";
export function getProgressStorageKey(title) {
    const slug = title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    return `vaexil.tv:recon-progress:${slug || "map"}`;
}
export function readProgressSnapshot(storageKey) {
    if (typeof window === "undefined") {
        return "[]";
    }
    try {
        return window.localStorage.getItem(storageKey) || "[]";
    }
    catch {
        return "[]";
    }
}
export function parseProgressSnapshot(snapshot) {
    try {
        const markerIds = JSON.parse(snapshot);
        return new Set(Array.isArray(markerIds)
            ? markerIds.filter((id) => typeof id === "string")
            : []);
    }
    catch {
        return new Set();
    }
}
export function writeProgressSnapshot(storageKey, markerIds) {
    if (typeof window === "undefined") {
        return;
    }
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(Array.from(markerIds)));
        window.dispatchEvent(new Event("vaexil-recon-progress"));
    }
    catch {
        window.dispatchEvent(new Event("vaexil-recon-progress"));
    }
}
export function subscribeToProgressStorage(storageKey, onStoreChange) {
    if (typeof window === "undefined") {
        return () => { };
    }
    function handleStorage(event) {
        if (event.key === storageKey) {
            onStoreChange();
        }
    }
    window.addEventListener("storage", handleStorage);
    window.addEventListener("vaexil-recon-progress", onStoreChange);
    return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("vaexil-recon-progress", onStoreChange);
    };
}
