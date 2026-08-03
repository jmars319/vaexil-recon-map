"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReconMapViewer, } from "./recon-map-viewer";
import { cn } from "./utils";
import { useState } from "react";
function matchesFloor(marker, floor) {
    const activeFloor = floor.trim().toLowerCase();
    if (!activeFloor) {
        return true;
    }
    const markerFloor = (marker.floor || "").trim().toLowerCase();
    return !markerFloor || markerFloor === activeFloor;
}
export function ReconPublicMapPreview({ title, imageSrc, imageAlt, width, height, minZoom, maxZoom, markers, categories, mapViews = [], markerSummaryLabel = "map locations", emptyState, className, suggestionContext, suggestionAction, }) {
    const views = mapViews.length > 0
        ? mapViews
        : [
            {
                id: "default",
                label: "Default",
                shortLabel: "Map",
                kind: "overview",
                floor: "",
                imageSrc: imageSrc || null,
                width,
                height,
                notes: "",
            },
        ];
    const [activeViewId, setActiveViewId] = useState(views[0]?.id || "default");
    const activeView = views.find((view) => view.id === activeViewId) || views[0];
    const visibleMarkers = markers.filter((marker) => matchesFloor(marker, activeView?.floor || ""));
    return (_jsxs("div", { className: cn("grid gap-3", className), children: [views.length > 1 ? (_jsx("section", { className: "rounded-2xl border border-white/10 bg-slate-950/40 p-3", children: _jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500", children: "Map view" }), _jsx("p", { className: "mt-1 truncate text-sm text-slate-300", children: activeView?.label || "Overview" }), activeView?.notes ? (_jsx("p", { className: "mt-1 text-xs leading-5 text-slate-500", children: activeView.notes })) : null] }), _jsx("div", { className: "flex flex-wrap gap-2", children: views.map((view) => (_jsx("button", { type: "button", "aria-pressed": view.id === activeView?.id, onClick: () => setActiveViewId(view.id), className: view.id === activeView?.id
                                    ? "rounded-lg bg-cyan-300 px-3 py-1.5 text-xs font-semibold text-slate-950"
                                    : "rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70", children: view.shortLabel }, view.id))) })] }) })) : null, _jsx(ReconMapViewer, { title: title, imageSrc: activeView?.imageSrc ?? imageSrc, imageAlt: imageAlt, width: activeView?.width || width, height: activeView?.height || height, minZoom: minZoom, maxZoom: maxZoom, markers: visibleMarkers, categories: categories, markerSummaryLabel: markerSummaryLabel, emptyState: emptyState, viewerMode: "public", suggestionContext: suggestionContext
                    ? {
                        ...suggestionContext,
                        floor: activeView?.floor || "",
                    }
                    : undefined, suggestionAction: suggestionAction })] }));
}
