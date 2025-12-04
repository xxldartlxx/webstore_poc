import { motion } from "framer-motion";
import type { Provider } from "../types/provider";
import { ProviderCard } from "./ProviderCard";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ProviderGridProps {
    providers: Provider[];
    favorites: Set<number>;
    onToggleFavorite: (id: number) => void;
    onViewProfile: (provider: Provider) => void;
}

export function ProviderGrid({ providers, favorites, onToggleFavorite, onViewProfile }: ProviderGridProps) {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {providers.map((provider) => (
                <ProviderCard
                    key={provider.id}
                    provider={provider}
                    isFavorite={favorites.has(provider.id)}
                    onToggleFavorite={onToggleFavorite}
                    onViewProfile={onViewProfile}
                    variants={item}
                />
            ))}
        </motion.div>
    );
}
