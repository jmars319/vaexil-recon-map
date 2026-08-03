import type { ReconViewerCategory } from "./recon-map-viewer-types";
type LayerGroupDefinition = {
    key: string;
    label: string;
    categoryKeys: string[];
};
export declare const layerGroups: LayerGroupDefinition[];
export declare const coreLayerKeys: Set<string>;
export declare const collectibleLayerKeys: Set<string>;
export declare const toolLayerKeys: Set<string>;
export declare function clamp(value: number, min: number, max: number): number;
export declare function formatCoordinate(value: number): string;
export type ReconLayerSection = {
    key: string;
    label: string;
    categories: ReconViewerCategory[];
};
export {};
