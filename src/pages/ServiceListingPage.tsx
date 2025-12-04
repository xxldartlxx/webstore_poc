import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ProfileModal } from "@/components/ui/profile-modal";
import { SlidersHorizontal } from "lucide-react";
import { ServiceListingHero } from "@/features/service-listing/components/ServiceListingHero";
import { ServiceListingShell } from "@/features/service-listing/components/ServiceListingShell";
import { ServiceFiltersSidebar } from "@/features/service-listing/components/ServiceFiltersSidebar";
import { ServiceFiltersMobileDialog } from "@/features/service-listing/components/ServiceFiltersMobileDialog";
import { ProviderGrid } from "@/features/service-listing/components/ProviderGrid";
import { MOCK_PROVIDERS } from "@/features/service-listing/data/mockProviders";
import { useServiceFilters } from "@/features/service-listing/hooks/useServiceFilters";
import { useFavorites } from "@/features/service-listing/hooks/useFavorites";
import { useSelectedProvider } from "@/features/service-listing/hooks/useSelectedProvider";

export function ServiceListingPage() {
    const [searchParams] = useSearchParams();

    const {
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
    } = useServiceFilters(MOCK_PROVIDERS, searchParams.get('category') ?? undefined);

    const { favorites, toggleFavorite } = useFavorites();
    const { selectedProvider, isModalOpen, openProfile, setIsModalOpen } = useSelectedProvider();

    const filterFormProps = {
        selectedCategory,
        onCategoryChange: (category: string) => setSelectedCategory(category),
        minPrice,
        maxPrice,
        onMinPriceChange: (value: string) => setMinPrice(value),
        onMaxPriceChange: (value: string) => setMaxPrice(value),
        minRating,
        onRatingToggle: toggleRatingFilter,
        verifiedOnly,
        onVerifiedChange: (value: boolean) => setVerifiedOnly(value),
    };

    return (
        <div className="min-h-screen bg-background">
            <ServiceListingHero
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
            />

            <ServiceListingShell
                sidebar={
                    <ServiceFiltersSidebar
                        {...filterFormProps}
                        onClearFilters={handleClearFilters}
                    />
                }
            >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                            {filteredProviders.length} professionals
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Showing results for {selectedCategory}
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto items-center gap-2 flex-wrap sm:flex-nowrap">
                        <select className="flex-1 sm:flex-none bg-card border border-border rounded-full text-xs py-2 px-3 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:border-primary/50 transition-colors font-medium">
                            <option>Best Match</option>
                            <option>Top Rated</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Reviews</option>
                        </select>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-shrink-0 rounded-full px-3 py-2 flex items-center gap-2"
                            onClick={() => setIsFilterDialogOpen(true)}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="text-xs font-medium">Filters</span>
                            {appliedFiltersCount > 0 && (
                                <span className="hidden sm:inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                                    {appliedFiltersCount} applied
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mb-6 hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-foreground font-semibold text-lg">
                            {filteredProviders.length} professionals available
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Showing results for {selectedCategory}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort:</span>
                        <select className="bg-card border border-border rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:border-primary/50 transition-colors font-medium">
                            <option>Best Match</option>
                            <option>Top Rated</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Reviews</option>
                        </select>
                    </div>
                </div>

                <ProviderGrid
                    providers={filteredProviders}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onViewProfile={openProfile}
                />
            </ServiceListingShell>

            <ServiceFiltersMobileDialog
                {...filterFormProps}
                open={isFilterDialogOpen}
                onOpenChange={(open) => setIsFilterDialogOpen(open)}
                onClearFilters={handleClearFilters}
            />

            <ProfileModal
                provider={selectedProvider}
                open={isModalOpen}
                onOpenChange={(open) => setIsModalOpen(open)}
            />
        </div>
    );
}
