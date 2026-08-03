"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ReconMapViewer, } from "./recon-map-viewer";
import { Save } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
// Suggestion action contract
const initialState = {
    ok: false,
    message: "",
};
function FieldErrors({ errors }) {
    if (!errors?.length) {
        return null;
    }
    return _jsx("p", { className: "mt-2 text-sm text-rose-200", children: errors[0] });
}
function SubmitButton({ disabled }) {
    const { pending } = useFormStatus();
    return (_jsxs("button", { type: "submit", disabled: pending || disabled, className: "inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-60", children: [_jsx(Save, { className: "mr-2 size-4", "aria-hidden": "true" }), pending ? "Saving..." : "Save pending marker"] }));
}
function formatCoordinate(value) {
    return value == null ? "--" : value.toFixed(2);
}
// Admin capture workflow
export function ReconCoordinateCapture({ map, imageSrc, categories, icons, markers = [], suggestions, mapViews = [], submitAction, }) {
    const [state, formAction] = useActionState(submitAction, initialState);
    const views = mapViews.length > 0
        ? mapViews
        : [
            {
                id: "default",
                label: "Default",
                shortLabel: "Default",
                kind: "overview",
                floor: "",
                assetId: "",
                imageSrc,
                width: map.width,
                height: map.height,
                notes: "",
            },
        ];
    const [activeViewId, setActiveViewId] = useState(views[0]?.id || "default");
    const activeView = views.find((view) => view.id === activeViewId) || views[0];
    // Coordinate state boundary
    const [coordinate, setCoordinate] = useState(null);
    const [category, setCategory] = useState(categories[0]?.key || "poi");
    const [floor, setFloor] = useState(activeView?.floor || "");
    const activeCategory = categories.find((item) => item.key === category) || categories[0];
    const [iconKey, setIconKey] = useState(activeCategory?.defaultIconKey || "poi");
    const iconByKey = useMemo(() => new Map(icons.map((icon) => [icon.key, icon])), [icons]);
    const activeFloor = (activeView?.floor || "").trim().toLowerCase();
    // Active-floor marker boundary
    const draftMarkers = markers.filter((marker) => {
        if (!activeFloor) {
            return true;
        }
        const markerFloor = (marker.floor || "").trim().toLowerCase();
        return !markerFloor || markerFloor === activeFloor;
    });
    const suggestionMarkers = suggestions
        .filter((suggestion) => {
        if (!activeFloor) {
            return true;
        }
        const suggestionFloor = (suggestion.floor || "").trim().toLowerCase();
        return !suggestionFloor || suggestionFloor === activeFloor;
    })
        .map((suggestion) => ({
        id: suggestion.id,
        label: suggestion.label,
        description: suggestion.description,
        category: suggestion.category,
        x: suggestion.x,
        y: suggestion.y,
        floor: suggestion.floor,
        iconKey: suggestion.iconKey,
        iconPath: iconByKey.get(suggestion.iconKey)?.path,
    }));
    const viewerMarkers = [...draftMarkers, ...suggestionMarkers];
    // Capture surface composition
    return (_jsxs("div", { className: "grid gap-5", children: [views.length > 1 ? (_jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.035] p-3", children: _jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500", children: "Map view" }), activeView?.notes ? (_jsx("p", { className: "mt-1 truncate text-xs text-slate-400", children: activeView.notes })) : null] }), _jsx("div", { className: "flex flex-wrap gap-2", children: views.map((view) => (_jsx("button", { type: "button", "aria-pressed": view.id === activeView?.id, onClick: () => {
                                    setActiveViewId(view.id);
                                    setFloor(view.floor);
                                    setCoordinate(null);
                                }, className: view.id === activeView?.id
                                    ? "rounded-lg bg-cyan-300 px-3 py-1.5 text-xs font-semibold text-slate-950"
                                    : "rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[0.06]", children: view.shortLabel }, view.id))) })] }) })) : null, _jsx(ReconMapViewer, { title: `${map.title} coordinate capture`, imageSrc: activeView?.imageSrc ?? imageSrc, imageAlt: `${map.title} ${activeView?.label || "draft"} Recon map`, width: activeView?.width || map.width, height: activeView?.height || map.height, minZoom: map.minZoom, maxZoom: map.maxZoom, markers: viewerMarkers, categories: categories, onCoordinateCapture: setCoordinate, capturedCoordinate: coordinate, markerSummaryLabel: "draft/review markers", emptyState: "No private draft asset is available for this map yet." }), _jsxs("form", { action: formAction, className: "rounded-2xl border border-white/10 bg-white/[0.035] p-5", children: [_jsx("input", { type: "hidden", name: "gameId", value: map.gameId }), _jsx("input", { type: "hidden", name: "mapId", value: map.id }), _jsx("input", { type: "hidden", name: "x", value: coordinate?.x ?? "" }), _jsx("input", { type: "hidden", name: "y", value: coordinate?.y ?? "" }), _jsx("input", { type: "hidden", name: "iconKey", value: iconKey }), state.message ? (_jsx("div", { className: state.ok
                            ? "mb-5 rounded-xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100"
                            : "mb-5 rounded-xl border border-rose-300/40 bg-rose-300/10 px-4 py-3 text-sm text-rose-100", role: "status", children: state.message })) : null, _jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_160px_160px]", children: [_jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Label" }), _jsx("input", { name: "label", placeholder: "Short marker label", className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20" }), _jsx(FieldErrors, { errors: state.fieldErrors?.label })] }), _jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Mode" }), _jsxs("select", { name: "mode", defaultValue: "campaign", className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20", children: [_jsx("option", { value: "campaign", children: "Campaign" }), map.gameId === "hitman-woa" ? (_jsx("option", { value: "freelancer", children: "Freelancer" })) : null] }), _jsx(FieldErrors, { errors: state.fieldErrors?.mode })] }), _jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Variant" }), _jsxs("select", { name: "variant", defaultValue: "any", className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20", children: [_jsx("option", { value: "any", children: "Any" }), map.gameId === "hitman-woa" ? (_jsxs(_Fragment, { children: [_jsx("option", { value: "normal", children: "Normal" }), _jsx("option", { value: "alerted", children: "Alerted" })] })) : null] }), _jsx(FieldErrors, { errors: state.fieldErrors?.variant })] })] }), _jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-[1fr_220px_180px]", children: [_jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Description optional" }), _jsx("textarea", { name: "description", rows: 5, placeholder: "Keep this factual. Mark uncertainty in the description instead of inventing certainty.", className: "mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20" }), _jsx(FieldErrors, { errors: state.fieldErrors?.description })] }), _jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Category" }), _jsx("select", { name: "category", value: category, onChange: (event) => {
                                            const nextCategory = event.target.value;
                                            setCategory(nextCategory);
                                            setIconKey(categories.find((item) => item.key === nextCategory)
                                                ?.defaultIconKey || "poi");
                                        }, className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20", children: categories.map((item) => (_jsx("option", { value: item.key, children: item.label }, item.key))) }), _jsx(FieldErrors, { errors: state.fieldErrors?.category })] }), _jsxs("label", { children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Floor" }), _jsx("input", { name: "floor", value: floor, onChange: (event) => setFloor(event.target.value), placeholder: "Optional", className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20" }), _jsx(FieldErrors, { errors: state.fieldErrors?.floor })] })] }), _jsxs("label", { className: "mt-4 block", children: [_jsx("span", { className: "text-sm font-medium text-slate-200", children: "Source URL optional" }), _jsx("input", { name: "sourceUrl", type: "url", placeholder: "Use only first-hand or permitted references", className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20" }), _jsx(FieldErrors, { errors: state.fieldErrors?.sourceUrl })] }), _jsxs("div", { className: "mt-5 grid gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300 md:grid-cols-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: "Captured X" }), _jsx("p", { className: "mt-1 font-mono text-lg text-white", children: formatCoordinate(coordinate?.x ?? null) }), _jsx(FieldErrors, { errors: state.fieldErrors?.x })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: "Captured Y" }), _jsx("p", { className: "mt-1 font-mono text-lg text-white", children: formatCoordinate(coordinate?.y ?? null) }), _jsx(FieldErrors, { errors: state.fieldErrors?.y })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: "Icon" }), _jsx("select", { value: iconKey, onChange: (event) => setIconKey(event.target.value), className: "mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20", children: icons.map((icon) => (_jsx("option", { value: icon.key, children: icon.label }, icon.key))) })] })] }), _jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("p", { className: "max-w-2xl text-sm leading-6 text-slate-400", children: "Click the private draft map to capture normalized coordinates. Saved markers stay pending and are not published by this tool." }), _jsx(SubmitButton, { disabled: !coordinate })] })] })] }));
}
