import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ParallaxBackground } from './ParallaxBackground';
import { AIChatWindow } from '@/components/ai/AIChatWindow';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
            {location.pathname !== '/' && <ParallaxBackground />}
            <Navbar onOpenAIChat={() => setIsAIChatOpen(true)} />
            <main className="flex-1 relative z-10">
                {children}
            </main>
            {location.pathname !== '/' && <Footer />}
            <AIChatWindow isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
        </div>
    );
}
