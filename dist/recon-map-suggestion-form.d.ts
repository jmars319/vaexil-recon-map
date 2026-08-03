import type { ReconSuggestionContext, ReconSuggestionDraft, ReconViewerCategory } from "./recon-map-viewer-types";
import type { ReconMarkerSuggestionAction } from "./types";
type ReconMapSuggestionFormProps = {
    context: ReconSuggestionContext;
    categories: ReconViewerCategory[];
    draft: ReconSuggestionDraft;
    onClose: () => void;
    submitAction: ReconMarkerSuggestionAction;
};
export declare function ReconMapSuggestionForm({ context, categories, draft, onClose, submitAction, }: ReconMapSuggestionFormProps): import("react").JSX.Element;
export {};
