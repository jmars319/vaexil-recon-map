import type { ReconViewerMarker } from "./recon-map-viewer-types";
type MarkerDetailPanelProps = {
    marker: ReconViewerMarker;
    categoryLabel: string;
    onCenter: () => void;
    onClose: () => void;
    onToggleCompleted?: () => void;
    onSuggestCorrection?: () => void;
    completed?: boolean;
    compact?: boolean;
    publicMode?: boolean;
};
export declare function MarkerDetailPanel({ marker, categoryLabel, onCenter, onClose, onToggleCompleted, onSuggestCorrection, completed, compact, publicMode, }: MarkerDetailPanelProps): import("react").JSX.Element;
export {};
