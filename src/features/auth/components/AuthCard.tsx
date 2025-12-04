import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer?: ReactNode;
    variant?: "login" | "signup";
}

export function AuthCard({ title, subtitle, children, footer, variant = "login" }: AuthCardProps) {
    const backgroundConfig = {
        login: {
            primary: "top-[-10%] left-[-10%]",
            secondary: "bottom-[-10%] right-[-10%]",
        },
        signup: {
            primary: "top-[-10%] right-[-10%]",
            secondary: "bottom-[-10%] left-[-10%]",
        },
    } as const;

    const { primary, secondary } = backgroundConfig[variant];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden z-20">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className={`absolute ${primary} w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px]`} />
                <div className={`absolute ${secondary} w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]`} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md md:max-w-lg p-8 md:p-10 rounded-3xl glass-card shiny-border glow-high"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>

                {children}

                {footer && <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>}
            </motion.div>
        </div>
    );
}
