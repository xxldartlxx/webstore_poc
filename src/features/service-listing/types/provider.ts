export interface Provider {
    id: number;
    name: string;
    role: string;
    rating: number;
    reviews: number;
    price: string;
    location: string;
    image: string;
    tags: string[];
    verified: boolean;
    responseTime: string;
    completedJobs: number;
}
