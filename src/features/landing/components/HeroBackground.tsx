import { ReactNode } from "react";

interface HeroBackgroundProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    children: ReactNode;
}

export function HeroBackground({ videoRef, children }: HeroBackgroundProps) {
    return (
        <section className="relative flex items-center justify-center min-h-screen mt-[-5rem] overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 blur-[2px]"
                >
                    <source src="https://videos.pexels.com/video-files/4496268/4496268-sd_640_360_25fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/40 to-background z-0" />
            </div>

            <div className="container relative z-10 pt-20">
                {children}
            </div>
        </section>
    );
}
