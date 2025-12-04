import { useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    enableProximity?: boolean;
    glowIntensity?: 'low' | 'medium' | 'high';
}

export function GlassCard({
    children,
    className,
    enableProximity = true,
    glowIntensity = 'medium'
}: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enableProximity || !cardRef.current) return;

        const card = cardRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
            const maxDistance = Math.sqrt(
                Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
            );
            const proximity = 1 - Math.min(distance / maxDistance, 1);

            // Set CSS custom properties for proximity effects
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.setProperty('--proximity', proximity.toString());
        };

        const handleMouseEnter = () => {
            card.style.setProperty('--is-hovering', '1');
        };

        const handleMouseLeave = () => {
            card.style.setProperty('--is-hovering', '0');
            card.style.setProperty('--proximity', '0');
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [enableProximity]);

    const glowClass = {
        low: 'glow-low',
        medium: 'glow-medium',
        high: 'glow-high'
    }[glowIntensity];

    return (
        <div
            ref={cardRef}
            className={cn(
                'glass-card shiny-border rounded-xl p-6 relative',
                enableProximity && 'proximity-glow',
                glowClass,
                className
            )}
            style={{
                '--mouse-x': '0px',
                '--mouse-y': '0px',
                '--proximity': '0',
                '--is-hovering': '0'
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
