import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    variant?: "default" | "sheet";
}

export function Dialog({ open, onOpenChange, children, variant = "default" }: DialogProps) {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [open, onOpenChange]);

    const isSheet = variant === "sheet";

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />
                    {/* Dialog Content */}
                    <div className={cn("fixed inset-0 z-50 flex p-4", isSheet ? "items-end justify-center" : "items-center justify-center")}>
                        <motion.div
                            initial={isSheet ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.95, y: 20 }}
                            animate={isSheet ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                            exit={isSheet ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl panel-glass",
                                isSheet && "max-w-3xl max-h-[80vh] rounded-t-3xl rounded-b-none sheet-glass"
                            )}
                        >
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
    return <div className={cn("p-6", className)}>{children}</div>;
}

interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}

export function DialogHeader({ children, className, onClose }: DialogHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between mb-4", className)}>
            <div className="flex-1">{children}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            )}
        </div>
    );
}

interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
    return (
        <h2 className={cn("text-2xl font-bold font-heading", className)}>
            {children}
        </h2>
    );
}

interface DialogDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    );
}
