import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ServiceFiltersForm, ServiceFiltersFormProps } from "./ServiceFiltersForm";

interface ServiceFiltersMobileDialogProps extends ServiceFiltersFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClearFilters: () => void;
}

export function ServiceFiltersMobileDialog({
    open,
    onOpenChange,
    onClearFilters,
    ...formProps
}: ServiceFiltersMobileDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} variant="sheet">
            <DialogContent className="max-w-lg w-full sheet-glass border-0 rounded-t-3xl pb-6">
                <DialogHeader onClose={() => onOpenChange(false)}>
                    <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Adjust your search filters</span>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 px-3 rounded-full border-primary/40 bg-primary/5 text-[11px] font-semibold text-primary hover:bg-primary/10 hover:text-primary/95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background transition-colors"
                            onClick={onClearFilters}
                        >
                            Clear all
                        </Button>
                    </div>

                    <ServiceFiltersForm {...formProps} categoryGroupName="mobile-category" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
