import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
            <DialogContent className="max-w-lg w-full">
                <DialogHeader onClose={() => onOpenChange(false)}>
                    <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Adjust your search filters</span>
                        <button
                            type="button"
                            onClick={onClearFilters}
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Clear all
                        </button>
                    </div>

                    <ServiceFiltersForm {...formProps} categoryGroupName="mobile-category" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
