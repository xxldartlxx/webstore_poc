import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-background border-t border-white/5 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background pointer-events-none" />

            <div className="container relative z-10 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                                <Briefcase className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold font-heading tracking-tight text-foreground">TaskFlow</span>
                        </Link>
                        <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
                            Connecting skilled professionals with people who need their expertise. Simple, fast, and reliable.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-foreground">Platform</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link to="/services" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Browse Services</Link></li>
                            <li><Link to="/providers" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Find Professionals</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />How it Works</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-foreground">Company</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-foreground">Legal</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link to="/terms" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

