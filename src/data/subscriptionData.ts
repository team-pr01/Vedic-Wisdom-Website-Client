import { ICONS } from "../assets";
export type TPricingFeature = {
    id: number;
    text: string;
    included: boolean;
}

export type TPricingPlan = {
    id: number;
    title: string;
    description: string;
    icon?: string;
    price: {
        monthly: number;
        yearly: number;
    };
    isPopular: boolean;
    features: TPricingFeature[];
    badge?: string;
}


export const subscriptionPlans: TPricingPlan[] = [
    {
        id: 1,
        title: "Basic Plan",
        description: "Spiritual wellness journey",
        icon: ICONS.basicPlan,
        price: {
            monthly: 19,
            yearly: 190 // ~20% off (19 * 10 months)
        },
        isPopular: false,
        features: [
            { id: 1, text: "AI Spiritual Guide with chat access", included: true },
            { id: 2, text: "Daily Horoscope, Panchang & spiritual wisdom feed", included: true },
            { id: 3, text: "Meditation, Ayurveda & wellness tips", included: true },
            { id: 3, text: "Limited access to quizzes and content.", included: true },
            { id: 4, text: "Temple explorer, Sanatan Sthal access & support", included: true }
        ]
    },
    {
        id: 2,
        title: "Premium Plan",
        description: "For serious self-growth seekers",
        icon: ICONS.basicPlan,
        price: {
            monthly: 49,
            yearly: 490 // ~20% off (49 * 10 months)
        },
        isPopular: true,
        badge: "Most Popular",
        features: [
            { id: 1, text: "AI Spiritual Consultant with unlimited chat support", included: true },
            { id: 2, text: "Personalized Horoscope, Panchang & Jyotish advice", included: true },
            { id: 3, text: "Meditation workshops, wellness & retreats", included: true },
            { id: 4, text: "Spiritual insights, articles & learning access", included: true },
            { id: 5, text: "Quiz, learning suite & collaborative features", included: true },
            { id: 6, text: "Ayurveda solutions with personalized guidance.", included: true },
            { id: 7, text: "24/7 premium support with member benefits", included: true }
        ]
    },
    {
        id: 3,
        title: "Pro Plan",
        description: "Spiritual wellness journey",
        icon: ICONS.proPlan,
        price: {
            monthly: 99,
            yearly: 990 // ~20% off (99 * 10 months)
        },
        isPopular: false,
        features: [
            { id: 1, text: "Personal AI Wellness Coach", included: true },
            { id: 2, text: "Advanced Horoscope & Panchang Insights", included: true },
            { id: 3, text: "Personalized Meditation Programs", included: true },
            { id: 4, text: "Enhanced AI Chat (Higher Limit)", included: true },
            { id: 5, text: "Curated Spiritual Reads & Videos", included: true },
            { id: 5, text: "Comprehensive Quiz & Learning Access", included: true },
            { id: 5, text: "Sacred Sites & Ritual Planner", included: true },
            { id: 5, text: "Ayurveda Advanced Guidance", included: true },
            { id: 5, text: "Bookmark & Share Content", included: true },
            { id: 5, text: "Priority Support Access", included: true },
        ]
    }
];