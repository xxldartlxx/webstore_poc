import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceListingHeroProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch?: () => void;
}

export function ServiceListingHero({ searchTerm, onSearchTermChange, onSearch }: ServiceListingHeroProps) {
    return (
        <div className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container py-12 lg:py-16">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-heading">
                            Hire Expert <span className="text-primary">Professionals</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Browse trusted service providers, compare prices, and book with confidence
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                    >
                        <div className="relative flex items-center bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="What service are you looking for?"
                                className="pl-14 pr-4 h-16 text-base bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchTerm}
                                onChange={(e) => onSearchTermChange(e.target.value)}
                            />
                            <Button
                                className="m-2 h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 transition-all font-semibold"
                                onClick={onSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
