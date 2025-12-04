import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export function PrimaryButton({ loading, className, children, ...props }: PrimaryButtonProps) {
    return (
        <button
            className={cn(
                "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500",
                "text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                "flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed",
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
        </button>
    );
}

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactNode;
    loading?: boolean;
}

export function SecondaryButton({ icon, children, className, loading, ...props }: SecondaryButtonProps) {
    return (
        <button
            className={cn(
                "w-full bg-secondary/50 hover:bg-secondary border border-border text-foreground font-medium py-3.5",
                "rounded-xl transition-all flex items-center justify-center space-x-3 group disabled:opacity-70 disabled:cursor-not-allowed",
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
            <span>{children}</span>
        </button>
    );
}
