import { useCallback, useEffect, useMemo, useState } from "react";
import type { Provider } from "../types/provider";

const DEFAULT_CATEGORY = "All Categories";

const parsePrice = (price: string) => {
    const numeric = parseInt(price.replace(/[^0-9]/g, ""), 10);
    return Number.isNaN(numeric) ? null : numeric;
};

export function useServiceFilters(providers: Provider[], initialCategory: string = DEFAULT_CATEGORY) {
    const normalizedCategory = initialCategory || DEFAULT_CATEGORY;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(normalizedCategory);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState<number | null>(null);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    useEffect(() => {
        setSelectedCategory(normalizedCategory);
    }, [normalizedCategory]);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory(DEFAULT_CATEGORY);
        setMinPrice("");
        setMaxPrice("");
        setMinRating(null);
        setVerifiedOnly(false);
    }, []);

    const toggleRatingFilter = useCallback((rating: number) => {
        setMinRating((current) => (current === rating ? null : rating));
    }, []);

    const appliedFiltersCount = useMemo(() => {
        return (
            (selectedCategory !== DEFAULT_CATEGORY ? 1 : 0) +
            (minPrice ? 1 : 0) +
            (maxPrice ? 1 : 0) +
            (minRating !== null ? 1 : 0) +
            (verifiedOnly ? 1 : 0)
        );
    }, [selectedCategory, minPrice, maxPrice, minRating, verifiedOnly]);

    const filteredProviders = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return providers.filter((provider) => {
            if (term) {
                const haystack = `${provider.name} ${provider.role} ${provider.location} ${provider.tags.join(" ")}`.toLowerCase();
                if (!haystack.includes(term)) {
                    return false;
                }
            }

            if (selectedCategory !== DEFAULT_CATEGORY) {
                const matchesCategory =
                    provider.tags.includes(selectedCategory) || provider.role === selectedCategory;
                if (!matchesCategory) {
                    return false;
                }
            }

            const providerPrice = parsePrice(provider.price);
            const min = minPrice ? parseInt(minPrice, 10) : null;
            const max = maxPrice ? parseInt(maxPrice, 10) : null;

            if (providerPrice !== null) {
                if (min !== null && providerPrice < min) {
                    return false;
                }
                if (max !== null && providerPrice > max) {
                    return false;
                }
            }

            if (minRating !== null && provider.rating < minRating) {
                return false;
            }

            if (verifiedOnly && !provider.verified) {
                return false;
            }

            return true;
        });
    }, [providers, searchTerm, selectedCategory, minPrice, maxPrice, minRating, verifiedOnly]);

    return {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minRating,
        toggleRatingFilter,
        verifiedOnly,
        setVerifiedOnly,
        filteredProviders,
        appliedFiltersCount,
        handleClearFilters,
        isFilterDialogOpen,
        setIsFilterDialogOpen,
    };
}
