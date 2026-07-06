import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ConsultantCard from "../../../components/Dashboard/ConsultancyPage/ConsultantCard/ConsultantCard";
import { IoSearchOutline } from "react-icons/io5";

const Consultancy = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const consultantCategories = [
    "All",
    "Astrology",
    "Vastu",
    "Ayurveda",
    "Yoga",
    "Numerology",
    "Vedic Astrology",
    "Palmistry",
    "Meditation",
    "Tarot Reading",
    "Moon Sign Astrology",
    "Business Astrology",
    "Love & Relationship",
    "Career Counseling",
    "Finance Astrology",
    "Vedic Education",
    "Spiritual Healing",
    "Gemstone Consultation",
    "Temple Architecture",
    "Vedic Rituals",
  ];

  const experts = [
    {
      id: 1,
      name: "Arjun Thakur",
      expertise: "Vastu Expert",
      rating: 4.8,
      reviews: 127,
      image: "https://via.placeholder.com/80x80", // Replace with actual image
      experience: "12 years",
      isOnline: true,
      pricePerHour: 49,
      isVerified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      expertise: "Jyotish Expert",
      rating: 4.9,
      reviews: 203,
      image: "https://via.placeholder.com/80x80",
      experience: "8 years",
      isOnline: true,
      pricePerHour: 59,
      isVerified: true,
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      expertise: "Ayurveda Expert",
      rating: 4.7,
      reviews: 89,
      image: "https://via.placeholder.com/80x80",
      experience: "15 years",
      isOnline: false,
      pricePerHour: 69,
      isVerified: true,
    },
    {
      id: 1,
      name: "Arjun Thakur",
      expertise: "Vastu Expert",
      rating: 4.8,
      reviews: 127,
      image: "https://via.placeholder.com/80x80", // Replace with actual image
      experience: "12 years",
      isOnline: true,
      pricePerHour: 49,
      isVerified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      expertise: "Jyotish Expert",
      rating: 4.9,
      reviews: 203,
      image: "https://via.placeholder.com/80x80",
      experience: "8 years",
      isOnline: true,
      pricePerHour: 59,
      isVerified: true,
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      expertise: "Ayurveda Expert",
      rating: 4.7,
      reviews: 89,
      image: "https://via.placeholder.com/80x80",
      experience: "15 years",
      isOnline: false,
      pricePerHour: 69,
      isVerified: true,
    },
    {
      id: 1,
      name: "Arjun Thakur",
      expertise: "Vastu Expert",
      rating: 4.8,
      reviews: 127,
      image: "https://via.placeholder.com/80x80", // Replace with actual image
      experience: "12 years",
      isOnline: true,
      pricePerHour: 49,
      isVerified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      expertise: "Jyotish Expert",
      rating: 4.9,
      reviews: 203,
      image: "https://via.placeholder.com/80x80",
      experience: "8 years",
      isOnline: true,
      pricePerHour: 59,
      isVerified: true,
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      expertise: "Ayurveda Expert",
      rating: 4.7,
      reviews: 89,
      image: "https://via.placeholder.com/80x80",
      experience: "15 years",
      isOnline: false,
      pricePerHour: 69,
      isVerified: true,
    },
  ];
  return (
    <div className="font-Manrope">
      <DashboardHeading
        title="Our Expert Consultants"
        description="Book a session with our expert consultants to learn more about Vedic Astrology and Ayurveda."
      />

      {/* Search Input */}
      <div className="relative w-full max-w-md mt-6">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-40 w-5 h-5" />
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-40/30"
          placeholder="Search consultants by name or expertise..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        {consultantCategories?.map((sign) => (
          <button
            key={sign}
            onClick={() => setSelectedCategory(sign)}
            className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm text-nowrap ${
              selectedCategory === sign
                ? "bg-primary-10 text-white"
                : "bg-white text-neutral-40"
            }`}
          >
            {sign}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {experts.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default Consultancy;
