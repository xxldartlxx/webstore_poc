import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    MapPin,
    Star,
    CheckCircle,
    Briefcase,
    Clock,
    Award,
    TrendingUp,
    Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { getCategoryIcon } from "@/lib/category-icons";

interface Provider {
    id: number;
    name: string;
    role: string;
    rating: number;
    reviews: number;
    price: string;
    location: string;
    image: string;
    tags: string[];
}

interface ProfileModalProps {
    provider: Provider | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ provider, open, onOpenChange }: ProfileModalProps) {
    if (!provider) return null;

    // Mock additional data that would come from an API
    const additionalInfo = {
        completedJobs: 247,
        successRate: 98,
        responseTime: "2 hours",
        memberSince: "2021",
        verified: true,
        bio: `Professional ${provider.role.toLowerCase()} with extensive experience in residential and commercial projects. Committed to delivering high-quality service and customer satisfaction.`,
        skills: [
            "Emergency Services",
            "Installation",
            "Repair & Maintenance",
            "Consultation",
            "Quality Assurance"
        ],
        recentReviews: [
            {
                id: 1,
                author: "Sarah M.",
                rating: 5,
                comment: "Excellent work! Very professional and completed the job on time.",
                date: "2 days ago"
            },
            {
                id: 2,
                author: "John D.",
                rating: 5,
                comment: "Highly recommend! Great attention to detail and very reliable.",
                date: "1 week ago"
            },
            {
                id: 3,
                author: "Emily R.",
                rating: 4,
                comment: "Good service, fair pricing. Would hire again.",
                date: "2 weeks ago"
            }
        ]
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} variant="sheet">
            <DialogContent className="p-0 w-full sm:max-w-3xl flex flex-col">
                <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4" onClose={() => onOpenChange(false)}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center w-full">
                        <div className="relative">
                            <img
                                src={provider.image}
                                alt={provider.name}
                                className="h-24 w-24 rounded-full object-cover border-4 border-background shadow-lg"
                            />
                            {additionalInfo.verified && (
                                <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center">
                                    <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <DialogTitle className="truncate">{provider.name}</DialogTitle>
                            <p className="text-lg text-muted-foreground font-medium">{provider.role}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {provider.rating} ({provider.reviews} reviews)
                                </Badge>
                                <Badge variant="outline" className="gap-1 text-primary border-primary/20 bg-primary/10">
                                    <CheckCircle className="h-3 w-3" />
                                    Verified
                                </Badge>
                            </div>
                        </div>
                        <div className="text-right shrink-0 space-y-1 sm:pl-4">
                            <div className="text-3xl font-bold text-primary leading-none">{provider.price}</div>
                            <div className="text-sm text-muted-foreground">Starting rate</div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-4 pb-4 pt-2 sm:p-6 space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="text-center glass-card shiny-border interactive-card">
                                <CardContent className="p-4">
                                    <Briefcase className="h-6 w-6 mx-auto mb-2 text-primary" />
                                    <div className="text-2xl font-bold">{additionalInfo.completedJobs}</div>
                                    <div className="text-xs text-muted-foreground">Completed Jobs</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="text-center glass-card shiny-border interactive-card">
                                <CardContent className="p-4">
                                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                                    <div className="text-2xl font-bold">{additionalInfo.successRate}%</div>
                                    <div className="text-xs text-muted-foreground">Success Rate</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="text-center glass-card shiny-border interactive-card">
                                <CardContent className="p-4">
                                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold">{additionalInfo.responseTime}</div>
                                    <div className="text-xs text-muted-foreground">Response Time</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="text-center glass-card shiny-border interactive-card">
                                <CardContent className="p-4">
                                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                                    <div className="text-2xl font-bold">{additionalInfo.memberSince}</div>
                                    <div className="text-xs text-muted-foreground">Member Since</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Location */}
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{provider.location}</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            About
                        </h3>
                        <p className="text-muted-foreground">{additionalInfo.bio}</p>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {[...provider.tags, ...additionalInfo.skills].map((skill, index) => {
                                const Icon = getCategoryIcon(skill);
                                return (
                                    <Badge key={index} variant="secondary" className="gap-1">
                                        <Icon className="h-3 w-3" />
                                        {skill}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Recent Reviews</h3>
                        <div className="space-y-3">
                            {additionalInfo.recentReviews.map((review) => (
                                <Card key={review.id} className="glass-card shiny-border">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium">{review.author}</p>
                                                <p className="text-xs text-muted-foreground">{review.date}</p>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < review.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 pb-4 pt-2 sm:p-6 sm:pt-0 flex flex-col sm:flex-row gap-3 border-t border-border/40 bg-background/80 backdrop-blur-md">
                    <Button className="flex-1 h-12 text-base font-semibold tracking-tight" size="lg">
                        Book Now
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 h-12 text-base font-semibold tracking-tight bg-background/40 border-primary/30 text-primary hover:bg-primary/15"
                        size="lg"
                    >
                        Send Message
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
