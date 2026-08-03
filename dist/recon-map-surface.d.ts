import type { ReconCoordinate, ReconViewerCategory, ReconViewerMarker } from "./recon-map-viewer-types";
import type { RefObject } from "react";
type ReconMapSurfaceProps = {
    title: string;
    imageSrc?: string | null;
    imageAlt?: string;
    width: number;
    height: number;
    markers: ReconViewerMarker[];
    filteredMarkers: ReconViewerMarker[];
    markerSummaryLabel: string;
    emptyState: string;
    publicMode: boolean;
    completedMarkerIds: Set<string>;
    completedCount: number;
    totalTrackableMarkers: number;
    scale: number;
    offset: {
        x: number;
        y: number;
    };
    selectedId: string | null;
    selectedMarker: ReconViewerMarker | null;
    selectedPopoverPosition: {
        left: number;
        top: number;
    } | null;
    capturedCoordinate?: ReconCoordinate | null;
    viewportRef: RefObject<HTMLDivElement | null>;
    dragRef: RefObject<{
        pointerId: number;
        startX: number;
        startY: number;
        lastX: number;
        lastY: number;
        moved: boolean;
    } | null>;
    scaleRef: RefObject<number>;
    offsetRef: RefObject<{
        x: number;
        y: number;
    }>;
    syncViewState: (nextScale: number, nextOffset: {
        x: number;
        y: number;
    }) => void;
    resetView: () => void;
    zoomBy: (multiplier: number, point?: {
        x: number;
        y: number;
    }) => void;
    focusMarker: (marker: ReconViewerMarker, targetScale?: number) => void;
    toggleMarkerCompleted: (markerId: string) => void;
    onSuggestMarkerCorrection?: (marker: ReconViewerMarker) => void;
    setSelectedId: (id: string | null) => void;
    getCoordinateFromPointer: (clientX: number, clientY: number) => ReconCoordinate | null;
    onCoordinateCapture?: (coordinate: ReconCoordinate) => void;
    suggestionCaptureActive?: boolean;
    categoryByKey: Map<string, ReconViewerCategory>;
};
export declare function ReconMapSurface({ title, imageSrc, imageAlt, width, height, markers, filteredMarkers, markerSummaryLabel, emptyState, publicMode, completedMarkerIds, completedCount, totalTrackableMarkers, scale, offset, selectedId, selectedMarker, selectedPopoverPosition, capturedCoordinate, viewportRef, dragRef, scaleRef, offsetRef, syncViewState, resetView, zoomBy, focusMarker, toggleMarkerCompleted, onSuggestMarkerCorrection, setSelectedId, getCoordinateFromPointer, onCoordinateCapture, suggestionCaptureActive, categoryByKey, }: ReconMapSurfaceProps): import("react").JSX.Element;
export {};
