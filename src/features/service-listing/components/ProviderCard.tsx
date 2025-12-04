import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryIcon } from "@/lib/category-icons";
import { Heart, MapPin, Star, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { Provider } from "../types/provider";

interface ProviderCardProps {
    provider: Provider;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onViewProfile: (provider: Provider) => void;
    variants?: Variants;
}

export function ProviderCard({ provider, isFavorite, onToggleFavorite, onViewProfile, variants }: ProviderCardProps) {
    return (
        <motion.div variants={variants}>
            <div className="group relative glass-card shiny-border proximity-glow glow-medium overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
                    <img
                        src={provider.image}
                        alt={provider.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=random`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(provider.id);
                        }}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
                    >
                        <Heart className={`h-4 w-4 transition-all ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </button>

                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{provider.rating}</span>
                        <span className="text-gray-500 font-normal text-xs">({provider.reviews})</span>
                    </div>

                    {provider.verified && (
                        <div className="absolute bottom-3 left-3">
                            <Badge className="bg-blue-500/90 text-white hover:bg-blue-500 font-medium shadow-lg backdrop-blur-sm border-0 gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified Pro
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors font-heading">
                            {provider.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">{provider.role}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{provider.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                            <span className="font-medium">{provider.completedJobs} jobs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 text-blue-500" />
                            <span className="font-medium">{provider.responseTime} response</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {provider.tags.slice(0, 3).map((tag) => {
                            const Icon = getCategoryIcon(tag);
                            return (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground flex items-center gap-1 hover:bg-secondary transition-colors"
                                >
                                    <Icon className="h-3 w-3" />
                                    {tag}
                                </span>
                            );
                        })}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
                            <p className="font-bold text-xl text-primary">{provider.price}</p>
                        </div>
                        <Button
                            size="sm"
                            className="rounded-xl px-6 h-10 bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all"
                            onClick={() => onViewProfile(provider)}
                        >
                            View Profile
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
