import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MarkerDetailPanel } from "./recon-marker-detail-panel";
import { cn } from "./utils";
import { Info, LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";
import Image from "next/image";
// Pointer surface contract
export function ReconMapSurface({ title, imageSrc, imageAlt, width, height, markers, filteredMarkers, markerSummaryLabel, emptyState, publicMode, completedMarkerIds, completedCount, totalTrackableMarkers, scale, offset, selectedId, selectedMarker, selectedPopoverPosition, capturedCoordinate, viewportRef, dragRef, scaleRef, offsetRef, syncViewState, resetView, zoomBy, focusMarker, toggleMarkerCompleted, onSuggestMarkerCorrection, setSelectedId, getCoordinateFromPointer, onCoordinateCapture, suggestionCaptureActive = false, categoryByKey, }) {
    // Detail panel contract
    const selectedCategoryLabel = selectedMarker
        ? categoryByKey.get(selectedMarker.category)?.label || selectedMarker.category
        : "";
    // Map surface composition
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("h2", { className: "text-sm font-semibold text-white", children: title }), _jsxs("p", { className: "mt-1 text-xs text-slate-500", children: [markers.length, " ", markerSummaryLabel, " / ", filteredMarkers.length, " visible /", " ", Math.round(scale * 100), "% zoom"] }), publicMode && totalTrackableMarkers > 0 ? (_jsxs("div", { className: "mt-2 flex max-w-sm items-center gap-2", children: [_jsx("div", { className: "h-1.5 min-w-28 flex-1 overflow-hidden rounded-full bg-white/10", children: _jsx("div", { className: "h-full rounded-full bg-emerald-300 transition-[width]", style: {
                                                        width: `${Math.round((completedCount / totalTrackableMarkers) * 100)}%`,
                                                    } }) }), _jsxs("span", { className: "shrink-0 text-[11px] font-semibold text-emerald-100", children: [completedCount, "/", totalTrackableMarkers, " found"] })] })) : null] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "hidden items-center gap-1 text-xs text-slate-500 sm:inline-flex", children: [_jsx(Info, { className: "size-3.5", "aria-hidden": "true" }), suggestionCaptureActive
                                                ? "Click map to place suggestion"
                                                : "Click markers for details"] }), _jsx("button", { type: "button", onClick: () => zoomBy(0.82), className: "inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70", "aria-label": "Zoom out", children: _jsx(Minus, { className: "size-4", "aria-hidden": "true" }) }), _jsx("button", { type: "button", onClick: () => zoomBy(1.22), className: "inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70", "aria-label": "Zoom in", children: _jsx(Plus, { className: "size-4", "aria-hidden": "true" }) }), _jsx("button", { type: "button", onClick: resetView, className: "inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70", "aria-label": "Reset view", children: _jsx(RotateCcw, { className: "size-4", "aria-hidden": "true" }) })] })] }), _jsxs("div", { ref: viewportRef, className: cn("relative touch-none overflow-hidden overscroll-contain bg-[#070b13]", publicMode
                            ? "h-[clamp(560px,76vh,960px)]"
                            : "h-[clamp(520px,72vh,900px)]"), "data-testid": "recon-map-viewport", "data-scale": scale.toFixed(4), onPointerDown: (event) => {
                            if (event.target.closest("[data-marker-button],[data-marker-detail]")) {
                                return;
                            }
                            event.currentTarget.setPointerCapture(event.pointerId);
                            dragRef.current = {
                                pointerId: event.pointerId,
                                startX: event.clientX,
                                startY: event.clientY,
                                lastX: event.clientX,
                                lastY: event.clientY,
                                moved: false,
                            };
                        }, onPointerMove: (event) => {
                            const drag = dragRef.current;
                            if (!drag || drag.pointerId !== event.pointerId) {
                                return;
                            }
                            const deltaX = event.clientX - drag.lastX;
                            const deltaY = event.clientY - drag.lastY;
                            const totalDistance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
                            if (totalDistance > 4) {
                                drag.moved = true;
                            }
                            drag.lastX = event.clientX;
                            drag.lastY = event.clientY;
                            const currentOffset = offsetRef.current;
                            syncViewState(scaleRef.current, {
                                x: currentOffset.x + deltaX,
                                y: currentOffset.y + deltaY,
                            });
                        }, onPointerUp: (event) => {
                            const drag = dragRef.current;
                            dragRef.current = null;
                            if (!drag || drag.pointerId !== event.pointerId) {
                                return;
                            }
                            if (!drag.moved && onCoordinateCapture) {
                                const coordinate = getCoordinateFromPointer(event.clientX, event.clientY);
                                if (coordinate) {
                                    onCoordinateCapture(coordinate);
                                }
                            }
                        }, children: [_jsxs("div", { className: "absolute left-0 top-0", style: {
                                    width,
                                    height,
                                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                                    transformOrigin: "0 0",
                                }, children: [imageSrc ? (_jsx(Image, { src: imageSrc, alt: imageAlt || "", width: width, height: height, unoptimized: true, priority: true, draggable: false, className: "h-full w-full select-none object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center border border-dashed border-white/15 bg-slate-950 text-center text-sm text-slate-400", children: _jsx("span", { className: "max-w-sm leading-6", children: emptyState }) })), filteredMarkers.map((marker) => (_jsxs("button", { type: "button", "data-marker-button": true, onClick: () => focusMarker(marker), className: cn("group/marker absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100/80 bg-slate-950/90 text-xs font-semibold text-cyan-100 shadow-[0_0_14px_rgba(34,211,238,0.32)] transition after:absolute after:-inset-2 after:content-[''] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100", completedMarkerIds.has(marker.id) &&
                                            "border-emerald-200/80 bg-emerald-300 text-slate-950 shadow-[0_0_16px_rgba(110,231,183,0.36)] opacity-80", selectedId === marker.id &&
                                            "z-20 scale-110 border-white bg-cyan-300 text-slate-950"), style: { left: `${marker.x}%`, top: `${marker.y}%` }, "aria-label": marker.label, title: marker.label, children: [marker.iconPath ? (_jsx(Image, { src: marker.iconPath, alt: "", width: 16, height: 16, unoptimized: true, className: "size-4", draggable: false })) : (_jsx(LocateFixed, { className: "size-3.5", "aria-hidden": "true" })), _jsx("span", { className: cn("pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] z-30 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/95 px-2 py-1 text-[11px] font-semibold text-white shadow-xl group-hover/marker:block group-focus-visible/marker:block", selectedId === marker.id && "block"), "aria-hidden": "true", children: marker.label })] }, marker.id))), capturedCoordinate ? (_jsx("div", { className: "pointer-events-none absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-300/20 text-emerald-100 shadow-[0_0_24px_rgba(110,231,183,0.45)]", style: {
                                            left: `${capturedCoordinate.x}%`,
                                            top: `${capturedCoordinate.y}%`,
                                        }, children: _jsx(LocateFixed, { className: "size-5", "aria-hidden": "true" }) })) : null] }), selectedMarker && selectedPopoverPosition ? (_jsx("div", { className: "absolute z-40 hidden md:block", style: {
                                    left: selectedPopoverPosition.left,
                                    top: selectedPopoverPosition.top,
                                }, children: _jsx(MarkerDetailPanel, { marker: selectedMarker, categoryLabel: selectedCategoryLabel, onCenter: () => focusMarker(selectedMarker, 1.65), onClose: () => setSelectedId(null), onToggleCompleted: () => toggleMarkerCompleted(selectedMarker.id), onSuggestCorrection: onSuggestMarkerCorrection
                                        ? () => onSuggestMarkerCorrection(selectedMarker)
                                        : undefined, completed: completedMarkerIds.has(selectedMarker.id), publicMode: publicMode }) })) : null] })] }), selectedMarker ? (_jsx("div", { className: "fixed inset-x-3 bottom-3 z-50 md:hidden", children: _jsx(MarkerDetailPanel, { marker: selectedMarker, categoryLabel: selectedCategoryLabel, onCenter: () => focusMarker(selectedMarker, 1.65), onClose: () => setSelectedId(null), onToggleCompleted: () => toggleMarkerCompleted(selectedMarker.id), onSuggestCorrection: onSuggestMarkerCorrection
                        ? () => onSuggestMarkerCorrection(selectedMarker)
                        : undefined, completed: completedMarkerIds.has(selectedMarker.id), compact: true, publicMode: publicMode }) })) : null] }));
}
