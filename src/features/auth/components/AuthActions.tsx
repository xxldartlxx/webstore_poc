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
                "w-full material-button raised tactile focus-glow",
                "text-white font-semibold py-3.5 px-5 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                "flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed",
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
                "w-full chip-glass text-foreground font-medium py-3.5 px-5",
                "rounded-full transition-all flex items-center justify-center space-x-3 group disabled:opacity-70 disabled:cursor-not-allowed",
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
