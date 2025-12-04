import { useNavigate } from 'react-router-dom';
import { HeroBackground } from "@/features/landing/components/HeroBackground";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { PopularCategoriesSection } from "@/features/landing/components/PopularCategoriesSection";
import { POPULAR_CATEGORIES } from "@/features/landing/data/popularCategories";
import { useHeroVideo } from "@/features/landing/hooks/useHeroVideo";

export function LandingPage() {
    const navigate = useNavigate();
    const { videoRef } = useHeroVideo();

    return (
        <HeroBackground videoRef={videoRef}>
            <HeroSection
                onPrimaryClick={() => navigate('/services')}
                onSecondaryClick={() => navigate('/providers')}
                actions={
                    <PopularCategoriesSection
                        categories={POPULAR_CATEGORIES}
                        onCategorySelect={(category) => navigate(`/services?category=${encodeURIComponent(category)}`)}
                    />
                }
            />
        </HeroBackground>
    );
}

