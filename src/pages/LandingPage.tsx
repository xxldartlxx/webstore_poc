import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Zap, Hammer, Sparkles, Paintbrush, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const POPULAR_CATEGORIES = [
    { name: "Plumbing", icon: Wrench, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { name: "Electrical", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { name: "Carpentry", icon: Hammer, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { name: "Cleaning", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { name: "Painting", icon: Paintbrush, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    { name: "Gardening", icon: Flower2, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
];

export function LandingPage() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative flex items-center justify-center min-h-screen mt-[-5rem] overflow-hidden bg-background">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40 blur-[2px]"
                    >
                        <source src="https://videos.pexels.com/video-files/4496268/4496268-sd_640_360_25fps.mp4" type="video/mp4" />
                    </video>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/40 to-background z-0" />
                </div>

                <div className="container relative z-10 pt-20">
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
                            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                        >
                            <Button
                                size="lg"
                                className="text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                                onClick={() => navigate('/services')}
                            >
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
                                onClick={() => navigate('/providers')}
                            >
                                Find Professionals
                            </Button>
                        </motion.div>

                        {/* Popular Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="w-full max-w-4xl pt-8"
                        >
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                                Popular Categories
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {POPULAR_CATEGORIES.map((category, index) => {
                                    const Icon = category.icon;
                                    return (
                                        <motion.button
                                            key={category.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.5 + (index * 0.1),
                                                ease: "easeOut"
                                            }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/services?category=${encodeURIComponent(category.name)}`)}
                                            className={`
                                                group flex items-center gap-3 px-5 py-3 rounded-2xl
                                                bg-card/50 backdrop-blur-md border border-border/50
                                                hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5
                                                transition-all duration-300
                                            `}
                                        >
                                            <div className={`p-2 rounded-lg ${category.bg} ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                                {category.name}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

