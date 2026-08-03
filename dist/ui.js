import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
import Link from "next/link";
export function Section({ children, className, ...props }) {
    return (_jsx("section", { className: cn("mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className), ...props, children: children }));
}
export function SectionHeading({ title, description, level = 2, }) {
    const HeadingTag = level === 1 ? "h1" : "h2";
    return (_jsxs("div", { className: "max-w-3xl", children: [_jsx(HeadingTag, { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl", children: title }), description ? (_jsx("p", { className: "mt-4 text-base leading-7 text-slate-300", children: description })) : null] }));
}
export function PrimaryLink({ href, children, }) {
    return (_jsx(Link, { href: href, className: "inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100", children: children }));
}
export function PrimaryExternalButton({ href, children, }) {
    return (_jsx("a", { href: href, target: "_blank", rel: "noreferrer", className: "inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100", children: children }));
}
export function SecondaryLink({ href, children, }) {
    return (_jsx(Link, { href: href, className: "inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.12] px-5 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-300/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/70", children: children }));
}
export function ExternalButton({ href, children, }) {
    return (_jsx("a", { href: href, target: "_blank", rel: "noreferrer", className: "inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.12] px-5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70", children: children }));
}
export function Panel({ children, className, }) {
    return (_jsx("div", { className: cn("rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_20px_80px_rgba(0,0,0,0.22)]", className), children: children }));
}
export function StatusBadge({ status }) {
    const label = status.replaceAll("_", " ");
    const statusStyles = status === "ready_for_review"
        ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
        : status === "verified"
            ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-100"
            : status === "published"
                ? "border-fuchsia-300/50 bg-fuchsia-300/10 text-fuchsia-100"
                : status === "rejected"
                    ? "border-rose-300/50 bg-rose-300/10 text-rose-100"
                    : "border-white/10 bg-white/5 text-slate-300";
    return (_jsx("span", { className: cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize", statusStyles), children: label }));
}
export function EmptyState({ title, description, }) {
    return (_jsxs(Panel, { className: "p-8 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: title }), _jsx("p", { className: "mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400", children: description })] }));
}
