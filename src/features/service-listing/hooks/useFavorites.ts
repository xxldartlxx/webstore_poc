import { useCallback, useState } from "react";

export function useFavorites(initialFavorites: number[] = []) {
    const [favorites, setFavorites] = useState<Set<number>>(new Set(initialFavorites));

    const toggleFavorite = useCallback((id: number) => {
        setFavorites((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    }, []);

    const isFavorite = useCallback((id: number) => favorites.has(id), [favorites]);

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
}
