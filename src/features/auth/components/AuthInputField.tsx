import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    containerClassName?: string;
}

export function AuthInputField({
    label,
    icon: Icon,
    className,
    containerClassName,
    ...props
}: AuthInputFieldProps) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            <label className="text-sm font-medium text-foreground/80 ml-1">{label}</label>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    className={cn(
                        "w-full bg-secondary/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground",
                        "placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 focus:bg-secondary transition-all",
                        className
                    )}
                    {...props}
                />
            </div>
        </div>
    );
}
