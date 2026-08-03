import { type ReconViewerCategory, type ReconViewerMarker } from "./recon-map-viewer";
import type { ReconMarkerSuggestion, ReconMarkerSuggestionAction } from "./types";
type IconOption = {
    key: string;
    label: string;
    path: string;
};
type ReconCoordinateCaptureProps = {
    map: {
        id: string;
        gameId: string;
        gameShortTitle: string;
        title: string;
        width: number;
        height: number;
        minZoom: number | null;
        maxZoom: number | null;
    };
    imageSrc: string | null;
    categories: ReconViewerCategory[];
    icons: IconOption[];
    markers?: ReconViewerMarker[];
    suggestions: ReconMarkerSuggestion[];
    mapViews?: MapViewOption[];
    submitAction: ReconMarkerSuggestionAction;
};
type MapViewOption = {
    id: string;
    label: string;
    shortLabel: string;
    kind: string;
    floor: string;
    assetId: string;
    imageSrc: string | null;
    width: number;
    height: number;
    notes: string;
};
export declare function ReconCoordinateCapture({ map, imageSrc, categories, icons, markers, suggestions, mapViews, submitAction, }: ReconCoordinateCaptureProps): import("react").JSX.Element;
export {};
