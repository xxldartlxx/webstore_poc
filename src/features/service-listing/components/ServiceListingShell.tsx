import { ReactNode } from "react";

interface ServiceListingShellProps {
    sidebar: ReactNode;
    children: ReactNode;
}

export function ServiceListingShell({ sidebar, children }: ServiceListingShellProps) {
    return (
        <div className="container py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                {sidebar}
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
