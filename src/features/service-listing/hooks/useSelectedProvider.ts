import { useCallback, useState } from "react";
import type { Provider } from "../types/provider";

export function useSelectedProvider() {
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProfile = useCallback((provider: Provider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    }, []);

    const closeProfile = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        selectedProvider,
        isModalOpen,
        openProfile,
        closeProfile,
        setIsModalOpen,
    };
}
