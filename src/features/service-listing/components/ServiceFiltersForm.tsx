import { Input } from "@/components/ui/input";
import { CheckCircle2, Star } from "lucide-react";
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
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Category</h4>
                <div className="space-y-1">
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

            <div className="space-y-3 pt-4 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input
                            placeholder="Min"
                            type="number"
                            className="pl-7 h-10 bg-background"
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
                            className="pl-7 h-10 bg-background"
                            value={maxPrice}
                            onChange={(e) => onMaxPriceChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground">Minimum Rating</h4>
                <div className="space-y-1">
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

            <div className="pt-4 border-t border-border/50">
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
