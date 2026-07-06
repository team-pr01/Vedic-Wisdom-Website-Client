import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ConsultantCard from "../../Dashboard/ConsultancyPage/ConsultantCard/ConsultantCard";

interface Expert {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  reviews: number;
  image: string;
  experience: string;
  isOnline: boolean;
  pricePerHour: number;
  isVerified?: boolean;
}

const AvailableExperts = ({
  areaOfExpertise,
  gridDirection = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: {
  areaOfExpertise: string;
  gridDirection?: string;
}) => {
  // Sample dataa
  const experts: Expert[] = [
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
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-neutral-90 font-bold text-xl">
          Available {areaOfExpertise} Experts
        </h4>
        <Link
          to={"/dashboard/experts"}
          className="text-primary-70 flex items-center gap-2 hover:underline"
        >
          View All
          <GoArrowRight />
        </Link>
      </div>

      <div className={`${gridDirection} gap-6`}>
        {experts.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default AvailableExperts;
