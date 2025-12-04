import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronDown, Star } from "lucide-react";
import { CATEGORY_OPTIONS, RATING_OPTIONS } from "../constants";

export interface ServiceFiltersFormProps {
    categoryOptions?: string[];
    ratingOptions?: number[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    minPrice: string;
    maxPrice: string;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    minRating: number | null;
    onRatingToggle: (rating: number) => void;
    verifiedOnly: boolean;
    onVerifiedChange: (value: boolean) => void;
    categoryGroupName?: string;
}

export function ServiceFiltersForm({
    categoryOptions = CATEGORY_OPTIONS,
    ratingOptions = RATING_OPTIONS,
    selectedCategory,
    onCategoryChange,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    minRating,
    onRatingToggle,
    verifiedOnly,
    onVerifiedChange,
    categoryGroupName = "category",
}: ServiceFiltersFormProps) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isRatingOpen, setIsRatingOpen] = useState(true);

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <button
                    type="button"
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                    onClick={() => setIsCategoryOpen((open) => !open)}
                >
                    <span>Category</span>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isCategoryOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                </button>
                <div
                    className={`space-y-1 overflow-hidden transition-all duration-300 ease-out ${isCategoryOpen ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}`}
                >
                    {categoryOptions.map((category) => (
                        <label
                            key={category}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${selectedCategory === category
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-secondary/50 text-muted-foreground"
                                }`}
                        >
                            <input
                                type="radio"
                                name={categoryGroupName}
                                checked={selectedCategory === category}
                                onChange={() => onCategoryChange(category)}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-sm font-medium">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-border/40">
                <button
                    type="button"
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                    onClick={() => setIsPriceOpen((open) => !open)}
                >
                    <span>Price Range</span>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isPriceOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${isPriceOpen ? "max-h-32 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}`}
                >
                    <div className="flex items-center gap-3 pt-1">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                            <Input
                                placeholder="Min"
                                type="number"
                                className="pl-7 h-10 bg-background/60"
                                value={minPrice}
                                onChange={(e) => onMinPriceChange(e.target.value)}
                            />
                        </div>
                        <span className="text-muted-foreground">—</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                            <Input
                                placeholder="Max"
                                type="number"
                                className="pl-7 h-10 bg-background/60"
                                value={maxPrice}
                                onChange={(e) => onMaxPriceChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-border/40">
                <button
                    type="button"
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                    onClick={() => setIsRatingOpen((open) => !open)}
                >
                    <span>Minimum Rating</span>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isRatingOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                </button>
                <div
                    className={`space-y-1 overflow-hidden transition-all duration-300 ease-out ${isRatingOpen ? "max-h-64 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}`}
                >
                    {ratingOptions.map((rating) => (
                        <label
                            key={rating}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                        >
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                                checked={minRating === rating}
                                onChange={() => onRatingToggle(rating)}
                            />
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">& up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-3 border-t border-border/40">
                <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                        checked={verifiedOnly}
                        onChange={(e) => onVerifiedChange(e.target.checked)}
                    />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Verified only</span>
                    </div>
                </label>
            </div>
        </div>
    );
}
