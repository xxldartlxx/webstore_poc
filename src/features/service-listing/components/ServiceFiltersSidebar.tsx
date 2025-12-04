import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { ServiceFiltersForm, ServiceFiltersFormProps } from "./ServiceFiltersForm";

interface ServiceFiltersSidebarProps extends ServiceFiltersFormProps {
    onClearFilters: () => void;
}

export function ServiceFiltersSidebar({ onClearFilters, ...formProps }: ServiceFiltersSidebarProps) {
    return (
        <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6 glass-card shiny-border">
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Filters</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-primary h-auto p-0 font-medium"
                        onClick={onClearFilters}
                    >
                        Clear all
                    </Button>
                </div>

                <ServiceFiltersForm {...formProps} />
            </div>
        </aside>
    );
}
