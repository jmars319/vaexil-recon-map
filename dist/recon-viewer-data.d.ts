import type { ReconAsset, ReconMarker, ReconMarkerDetail } from "./types";
import type { ReconViewerMarker } from "./recon-map-viewer";
type ViewerMarkerOptions = {
    iconPaths: Map<string, string>;
    adminMode?: boolean;
};
export declare function collectReconMarkerDetailAssetIds(details: ReconMarkerDetail[]): string[];
export declare function buildReconViewerMarkers(markers: ReconMarker[], details: ReconMarkerDetail[], assets: ReconAsset[], options: ViewerMarkerOptions): ReconViewerMarker[];
export {};
