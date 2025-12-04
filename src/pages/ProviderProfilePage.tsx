import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProviderProfilePage() {
    const [activeTab, setActiveTab] = useState("portfolio");

    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Profile Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="overflow-hidden glass-card shiny-border relative group">
                        {/* Expanding Profile Image */}
                        <motion.img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                            alt="Profile"
                            className="absolute object-cover z-20"
                            initial={{
                                top: "4rem", // 128px (h-32) / 2 ? No. Header is h-32 (8rem). Image is -mt-16 (-4rem). So top is 8rem - 4rem = 4rem.
                                left: "1.5rem", // px-6 is 1.5rem
                                width: "8rem", // w-32
                                height: "8rem", // h-32
                                borderRadius: "9999px",
                                borderWidth: "4px",
                                borderColor: "hsl(var(--background))"
                            }}
                            whileHover={{
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "0px",
                                borderWidth: "0px",
                                transition: { duration: 0.4, ease: "easeInOut" }
                            }}
                        />

                        <div className="h-32 bg-primary/10"></div>
                        <div className="px-6 pb-6 relative z-10">
                            <div className="relative -mt-16 mb-4">
                                {/* Placeholder to maintain layout */}
                                <div className="h-32 w-32 rounded-full border-4 border-transparent opacity-0"></div>
                                <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-background z-30"></div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold font-heading">John Doe</h1>
                                <p className="text-muted-foreground font-medium">Professional Plumber</p>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    New York, NY
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Badge variant="secondary" className="gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        4.8 (124 reviews)
                                    </Badge>
                                    <Badge variant="outline" className="gap-1 text-primary border-primary/20 bg-primary/10">
                                        <CheckCircle className="h-3 w-3" />
                                        Verified
                                    </Badge>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Button className="w-full raised tactile">Book Now</Button>
                                <Button variant="outline" className="w-full tactile">Message</Button>
                            </div>

                            <div className="mt-6 pt-6 border-t flex justify-between text-sm text-muted-foreground">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-foreground">98%</span>
                                    <span>Job Success</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-foreground">500+</span>
                                    <span>Completed</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-foreground">2h</span>
                                    <span>Response</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card shiny-border">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Pipe Repair", "Installation", "Leak Detection", "Water Heater", "Drain Cleaning"].map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="flex border-b glass-effect rounded-t-lg">
                        {["portfolio", "reviews", "about"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all tactile ${activeTab === tab
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "portfolio" && (
                                <motion.div
                                    key="portfolio"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="group relative aspect-video rounded-lg overflow-hidden glass-card shiny-border interactive-card">
                                            <img
                                                src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80`}
                                                alt={`Project ${i}`}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white font-medium">Bathroom Renovation</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === "reviews" && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    {[1, 2, 3].map((i) => (
                                        <Card key={i} className="glass-card shiny-border">
                                            <CardContent className="p-4 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                                                            JD
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">Jane Doe</p>
                                                            <p className="text-xs text-muted-foreground">2 days ago</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Great service! John was very professional and fixed the leak quickly. Highly recommended.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === "about" && (
                                <motion.div
                                    key="about"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4 text-muted-foreground"
                                >
                                    <p>
                                        I am a certified plumber with over 10 years of experience in residential and commercial plumbing.
                                        I specialize in leak detection, pipe repair, and water heater installation.
                                    </p>
                                    <p>
                                        My goal is to provide high-quality service at an affordable price. I am available for emergency calls 24/7.
                                    </p>
                                    <h4 className="font-semibold text-foreground pt-4">Certifications</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Master Plumber License</li>
                                        <li>OSHA Certified</li>
                                        <li>Green Plumbing Certification</li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
