import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { ServiceFiltersForm, ServiceFiltersFormProps } from "./ServiceFiltersForm";

interface ServiceFiltersSidebarProps extends ServiceFiltersFormProps {
    onClearFilters: () => void;
}

export function ServiceFiltersSidebar({ onClearFilters, ...formProps }: ServiceFiltersSidebarProps) {
    return (
        <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24 glass-card shiny-border glow-medium rounded-3xl p-5 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Filters</h3>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-[11px] font-semibold rounded-full border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary/95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background transition-colors"
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
