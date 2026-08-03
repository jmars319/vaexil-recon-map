import type { ReconViewerCategory, ReconViewerMarker } from "./recon-map-viewer";
type ReconHowToGuidesProps = {
    markers: ReconViewerMarker[];
    categories: ReconViewerCategory[];
    emptyState?: boolean;
};
export declare function ReconHowToGuides({ markers, categories, emptyState, }: ReconHowToGuidesProps): import("react").JSX.Element | null;
export {};
