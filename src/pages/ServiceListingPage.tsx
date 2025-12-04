import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProfileModal } from "@/components/ui/profile-modal";
import { Search, MapPin, Star, CheckCircle2, SlidersHorizontal, Heart, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getCategoryIcon } from "@/lib/category-icons";

const MOCK_PROVIDERS = [
    {
        id: 1,
        name: "John Doe",
        role: "Plumber",
        rating: 4.8,
        reviews: 124,
        price: "$50/hr",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        tags: ["Plumbing", "Repairs", "Emergency"],
        verified: true,
        responseTime: "2h",
        completedJobs: 245
    },
    {
        id: 2,
        name: "Sarah Smith",
        role: "Electrician",
        rating: 4.9,
        reviews: 89,
        price: "$65/hr",
        location: "Brooklyn, NY",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        tags: ["Electrical", "Wiring", "Installation"],
        verified: true,
        responseTime: "1h",
        completedJobs: 189
    },
    {
        id: 3,
        name: "Mike Johnson",
        role: "Carpenter",
        rating: 4.7,
        reviews: 56,
        price: "$45/hr",
        location: "Queens, NY",
        image: "https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?auto=format&fit=crop&w=400&q=80",
        tags: ["Carpentry", "Furniture", "Woodwork"],
        verified: false,
        responseTime: "3h",
        completedJobs: 156
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Cleaner",
        rating: 4.6,
        reviews: 210,
        price: "$30/hr",
        location: "Manhattan, NY",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        tags: ["Cleaning", "Home", "Office"],
        verified: true,
        responseTime: "30min",
        completedJobs: 432
    },
    {
        id: 5,
        name: "David Wilson",
        role: "Painter",
        rating: 4.8,
        reviews: 78,
        price: "$40/hr",
        location: "Bronx, NY",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        tags: ["Painting", "Interior", "Exterior"],
        verified: false,
        responseTime: "4h",
        completedJobs: 198
    },
    {
        id: 6,
        name: "Lisa Brown",
        role: "Gardener",
        rating: 4.9,
        reviews: 150,
        price: "$35/hr",
        location: "Staten Island, NY",
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&w=400&q=80",
        tags: ["Gardening", "Landscaping", "Maintenance"],
        verified: true,
        responseTime: "1h",
        completedJobs: 312
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function ServiceListingPage() {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedProvider, setSelectedProvider] = useState<typeof MOCK_PROVIDERS[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // Handle category from URL parameter
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    const handleViewProfile = (provider: typeof MOCK_PROVIDERS[0]) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Simplified Hero Section */}
            <div className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-heading">
                                Hire Expert <span className="text-primary">Professionals</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Browse trusted service providers, compare prices, and book with confidence
                            </p>
                        </motion.div>

                        {/* Enhanced Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="relative flex items-center bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="What service are you looking for?"
                                    className="pl-14 pr-4 h-16 text-base bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className="m-2 h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 transition-all font-semibold">
                                    Search
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Refined Filters Sidebar */}
                    <aside className="w-full lg:w-80">
                        <div className="sticky top-24 space-y-6">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold text-lg">Filters</h3>
                                </div>
                                <Button variant="ghost" size="sm" className="text-sm text-primary hover:text-primary/80 h-auto p-0 font-medium">
                                    Clear all
                                </Button>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-foreground">Category</h4>
                                <div className="space-y-1">
                                    {["All Categories", "Plumbing", "Electrical", "Cleaning", "Carpentry"].map((category) => (
                                        <label
                                            key={category}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${selectedCategory === category
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-secondary/50 text-muted-foreground'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === category}
                                                onChange={() => setSelectedCategory(category)}
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/20"
                                            />
                                            <span className="text-sm font-medium">
                                                {category}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                        <Input placeholder="Min" type="number" className="pl-7 h-10 bg-background" />
                                    </div>
                                    <span className="text-muted-foreground">—</span>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                        <Input placeholder="Max" type="number" className="pl-7 h-10 bg-background" />
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <h4 className="text-sm font-semibold text-foreground">Minimum Rating</h4>
                                <div className="space-y-1">
                                    {[5, 4, 3].map((rating) => (
                                        <label
                                            key={rating}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                                        >
                                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20" />
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">& up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Verified Only */}
                            <div className="pt-4 border-t border-border/50">
                                <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20" />
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-medium">Verified only</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-foreground font-semibold text-lg">
                                    {MOCK_PROVIDERS.length} professionals available
                                </p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Showing results for {selectedCategory}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort:</span>
                                <select className="bg-card border border-border rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:border-primary/50 transition-colors font-medium">
                                    <option>Best Match</option>
                                    <option>Top Rated</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Most Reviews</option>
                                </select>
                            </div>
                        </div>

                        {/* Provider Cards Grid */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {MOCK_PROVIDERS.map((provider) => (
                                <motion.div key={provider.id} variants={item}>
                                    <div className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                                        {/* Image Section */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
                                            <img
                                                src={provider.image}
                                                alt={provider.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=random`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Favorite Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(provider.id);
                                                }}
                                                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
                                            >
                                                <Heart
                                                    className={`h-4 w-4 transition-all ${favorites.has(provider.id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-600'
                                                        }`}
                                                />
                                            </button>

                                            {/* Rating Badge */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                <span>{provider.rating}</span>
                                                <span className="text-gray-500 font-normal text-xs">({provider.reviews})</span>
                                            </div>

                                            {/* Verified Badge */}
                                            {provider.verified && (
                                                <div className="absolute bottom-3 left-3">
                                                    <Badge className="bg-blue-500/90 text-white hover:bg-blue-500 font-medium shadow-lg backdrop-blur-sm border-0 gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Verified Pro
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            {/* Name & Category */}
                                            <div className="mb-3">
                                                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors font-heading">
                                                    {provider.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground font-medium">{provider.role}</p>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                                                <MapPin className="h-4 w-4" />
                                                <span>{provider.location}</span>
                                            </div>

                                            {/* Stats Row */}
                                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                                                    <span className="font-medium">{provider.completedJobs} jobs</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <Clock className="h-3.5 w-3.5 text-blue-500" />
                                                    <span className="font-medium">{provider.responseTime} response</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {provider.tags.slice(0, 3).map((tag) => {
                                                    const Icon = getCategoryIcon(tag);
                                                    return (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground flex items-center gap-1 hover:bg-secondary transition-colors"
                                                        >
                                                            <Icon className="h-3 w-3" />
                                                            {tag}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                                <div>
                                                    <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
                                                    <p className="font-bold text-xl text-primary">{provider.price}</p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="rounded-xl px-6 h-10 bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all"
                                                    onClick={() => handleViewProfile(provider)}
                                                >
                                                    View Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <ProfileModal
                provider={selectedProvider}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
