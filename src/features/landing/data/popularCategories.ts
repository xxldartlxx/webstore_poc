import { Flower2, Hammer, Paintbrush, Sparkles, Wrench, Zap } from "lucide-react";
import { LandingCategory } from "../types/category";

export const POPULAR_CATEGORIES: LandingCategory[] = [
    { name: "Plumbing", icon: Wrench, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { name: "Electrical", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { name: "Carpentry", icon: Hammer, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { name: "Cleaning", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { name: "Painting", icon: Paintbrush, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    { name: "Gardening", icon: Flower2, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
];
