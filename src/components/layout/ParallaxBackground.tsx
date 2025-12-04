import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
    const { scrollY } = useScroll();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Parallax transforms for different layers
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
        }> = [];

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                // Using a nice violet/primary color
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

            {/* Animated gradient orbs */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y1 }}
                className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
            />

            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-50"
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
}

