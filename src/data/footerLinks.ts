import { ICONS } from "../assets";

// data/footerLinks.ts
export interface FooterLink {
    label: string;
    path: string;
}

export interface FooterSection {
    heading: string;
    links: FooterLink[];
}

export const footerLinks: FooterSection[] = [
    {
        heading: "Explore",
        links: [
            { label: "Consultation", path: "/astrologer" },
            { label: "Vedic Marketplace", path: "/products" },
            { label: "Ayurveda & Wellness", path: "/ayurveda" },
            { label: "Job Portal", path: "/jobs" },
            { label: "Temple & Sacred Sites", path: "/temples" },
            { label: "Spiritual Content", path: "/content" }
        ]
    },
    {
        heading: "Learn & Grow",
        links: [
            { label: "Explore Courses", path: "/courses" },
            { label: "Vedic Books", path: "/vedic-knowledge" },
            { label: "Audio Books", path: "/vedic-knowledge" },
            { label: "Quizzes & Challenges", path: "/quizzes" },
            { label: "Recipe Generator", path: "/recipes" },
            { label: "Meditation & Yoga", path: "/meditation" }
        ]
    },
    {
        heading: "Company",
        links: [
            { label: "About Us", path: "/about-us" },
            { label: "Contact Us", path: "/contact-us" },
            { label: "Careers", path: "/careers" },
            { label: "Blogs", path: "/blogs" },
            { label: "FAQs", path: "/faqs" },
            { label: "Support", path: "/support" }
        ]
    },
    {
        heading: "Legal",
        links: [
            { label: "Terms & Conditions", path: "/terms-and-conditions" },
            { label: "Privacy Policy", path: "/privacy-policy" },
            { label: "Refund Policy", path: "/refund-policy" },
            { label: "Disclaimer", path: "/disclaimer" }
        ]
    }
];

export const socialMediaLinks = [
    { icon: ICONS.facebook, path: "https://www.facebook.com/" },
    { icon: ICONS.instagram, path: "https://www.instagram.com/" },
    { icon: ICONS.linkedin, path: "https://www.linkedin.com/" },
    { icon: ICONS.twitter, path: "https://twitter.com/" }
];