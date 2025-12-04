import { Provider } from "../types/provider";

export const MOCK_PROVIDERS: Provider[] = [
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
