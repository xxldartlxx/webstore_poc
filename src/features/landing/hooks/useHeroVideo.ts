import { useEffect, useRef } from "react";

export function useHeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log("Video play failed:", error);
            });
        }
    }, []);

    return {
        videoRef,
    };
}
