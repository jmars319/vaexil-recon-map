export declare function Section({ children, className, ...props }: React.ComponentProps<"section">): import("react").JSX.Element;
export declare function SectionHeading({ title, description, level, }: {
    title: string;
    description?: string;
    level?: 1 | 2;
}): import("react").JSX.Element;
export declare function PrimaryLink({ href, children, }: {
    href: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function PrimaryExternalButton({ href, children, }: {
    href: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function SecondaryLink({ href, children, }: {
    href: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function ExternalButton({ href, children, }: {
    href: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function Panel({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): import("react").JSX.Element;
export declare function StatusBadge({ status }: {
    status: string;
}): import("react").JSX.Element;
export declare function EmptyState({ title, description, }: {
    title: string;
    description: string;
}): import("react").JSX.Element;
