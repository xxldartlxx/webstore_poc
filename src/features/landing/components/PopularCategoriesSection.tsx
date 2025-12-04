import { motion } from "framer-motion";
import { LandingCategory } from "../types/category";

interface PopularCategoriesSectionProps {
    categories: LandingCategory[];
    onCategorySelect: (name: string) => void;
}

export function PopularCategoriesSection({ categories, onCategorySelect }: PopularCategoriesSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-4xl pt-8"
        >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                Popular Categories
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <motion.button
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.5 + index * 0.1,
                                ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCategorySelect(category.name)}
                            className={`
                                group flex items-center gap-3 px-5 py-3 rounded-2xl
                                bg-card/50 backdrop-blur-md border border-border/50
                                hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5
                                transition-all duration-300
                            `}
                        >
                            <div className={`p-2 rounded-lg ${category.bg} ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                {category.name}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
