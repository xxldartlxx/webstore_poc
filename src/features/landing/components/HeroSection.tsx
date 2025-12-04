import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
    onPrimaryClick: () => void;
    onSecondaryClick: () => void;
    actions?: ReactNode;
}

export function HeroSection({ onPrimaryClick, onSecondaryClick, actions }: HeroSectionProps) {
    return (
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground/80">The #1 Marketplace for Professionals</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-foreground leading-[1.1]">
                    Find Your Perfect{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 animate-gradient-x">
                        Professional
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                    Connect with skilled experts for any service you need.
                    <span className="hidden md:inline"> From home repairs to creative projects, we've got you covered.</span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="hero-cta-glass inline-flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center"
            >
                <Button
                    size="lg"
                    className="text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                    onClick={onPrimaryClick}
                >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="text-lg h-14 px-8 rounded-full bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
                    onClick={onSecondaryClick}
                >
                    Find Professionals
                </Button>
            </motion.div>

            {actions}
        </div>
    );
}
