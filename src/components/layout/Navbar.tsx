import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, Sparkles, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
    onOpenAIChat?: () => void;
}

export function Navbar({ onOpenAIChat }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isProfileOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isProfileOpen]);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Find Services', path: '/services' },
        { name: 'Find Professionals', path: '/providers' },
    ];

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
                scrolled || isMenuOpen ? "nav-glass h-20" : "bg-transparent h-24 border-transparent"
            )}
        >
            <div className="container h-full flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                            <Briefcase className="h-5 w-5 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-2xl font-bold font-heading tracking-tight text-foreground group-hover:text-primary transition-colors">
                            TaskFlow
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "text-sm font-medium transition-all duration-200 hover:text-primary relative group py-2",
                                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transform origin-left transition-transform duration-300",
                                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <ThemeToggle />

                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-primary hover:text-primary hover:bg-primary/10 rounded-full px-4"
                        onClick={onOpenAIChat}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span className="hidden lg:inline font-medium">AI Assistant</span>
                    </Button>

                    {isAuthenticated && (
                        <Button
                            size="sm"
                            className="gap-2 rounded-full px-4 bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            onClick={() => navigate('/jobs/new')}
                        >
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden lg:inline font-medium">Post a Job</span>
                            <span className="inline lg:hidden font-medium">Post</span>
                        </Button>
                    )}
                    {isAuthenticated && user ? (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 hover:bg-secondary/50 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-border"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-background"
                                />
                                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", isProfileOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-1.5rem)] glass-card rounded-2xl p-2 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <div className="h-px bg-border/50 my-1" />
                                        <div className="space-y-1">
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                                                <User className="w-4 h-4" />
                                                Profile
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </button>
                                        </div>
                                        <div className="h-px bg-border/50 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Log out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" className="font-medium hover:bg-primary/5 hover:text-primary">Log in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">Sign up</Button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden panel-glass border-b border-border/60 overflow-hidden"
                    >
                        <div className="container py-6 flex flex-col gap-4 text-foreground">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-base font-medium p-2 rounded-lg transition-colors text-foreground hover:bg-primary/5"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <Link
                                    to="/jobs/new"
                                    className="flex items-center gap-2 text-base font-medium p-2 rounded-lg transition-colors text-emerald-400 hover:bg-emerald-500/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Briefcase className="h-4 w-4" />
                                    Post a Job
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onOpenAIChat?.();
                                }}
                                className="flex items-center gap-2 text-base font-medium text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors"
                            >
                                <Sparkles className="h-4 w-4" />
                                AI Assistant
                            </button>
                            <hr className="border-white/10" />
                            {isAuthenticated && user ? (
                                <>
                                    <div className="flex items-center gap-4 px-2 py-2">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-base font-medium text-destructive px-2 py-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 pt-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">Log in</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center">Sign up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

