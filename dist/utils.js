import { clsx } from "clsx";
export function cn(...inputs) {
    return clsx(inputs);
}
export function formatDate(value) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}
