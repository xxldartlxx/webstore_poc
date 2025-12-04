import {
    Wrench,
    Zap,
    Hammer,
    Sparkles,
    Paintbrush,
    Flower2,
    Home,
    Briefcase,
    AlertCircle,
    Settings,
    Box,
    Shield,
    LucideIcon
} from "lucide-react";

export function getCategoryIcon(category: string): LucideIcon {
    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory.includes("plumb")) return Wrench;
    if (normalizedCategory.includes("electr") || normalizedCategory.includes("wiring")) return Zap;
    if (normalizedCategory.includes("carpen") || normalizedCategory.includes("wood")) return Hammer;
    if (normalizedCategory.includes("clean")) return Sparkles;
    if (normalizedCategory.includes("paint")) return Paintbrush;
    if (normalizedCategory.includes("garden") || normalizedCategory.includes("landscap")) return Flower2;
    if (normalizedCategory.includes("home") || normalizedCategory.includes("interior")) return Home;
    if (normalizedCategory.includes("office") || normalizedCategory.includes("business")) return Briefcase;
    if (normalizedCategory.includes("emerg")) return AlertCircle;
    if (normalizedCategory.includes("repair") || normalizedCategory.includes("mainten")) return Settings;
    if (normalizedCategory.includes("install")) return Box;
    if (normalizedCategory.includes("security") || normalizedCategory.includes("protect")) return Shield;

    return Sparkles; // Default icon
}
