import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import Button from "../Button/Button";
import { IMAGES } from "../../../assets";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

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

const AvailableExperts = ({ areaOfExpertise }: { areaOfExpertise: string }) => {
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-2xl border border-neutral-20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            <div className="p-6">
              {/* Header with Image and Status */}
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={IMAGES.dummyAvatar}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-10/20"
                  />
                  {expert.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-1 border-2 border-white">
                      <span className="block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-neutral-90 font-bold text-lg truncate">
                      {expert.name}
                    </h3>
                    {expert.isVerified && (
                      <MdVerified className="text-primary-10 text-lg shrink-0" />
                    )}
                  </div>
                  <p className="text-primary-10 text-sm font-medium">
                    {expert.expertise}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-semibold text-neutral-90">
                      {expert.rating}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {renderStars(expert.rating)}
                    </div>
                    <span className="text-xs text-neutral-60 ml-1">
                      ({expert.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-20">
                <div className="flex items-center gap-2">
                  <FiClock className="text-neutral-40 text-sm" />
                  <span className="text-sm text-neutral-60">
                    {expert.experience} experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineUserGroup className="text-primary-10" />
                  <span className="text-sm text-neutral-60">
                    Online Consultation Available
                  </span>
                </div>
              </div>

              {/* Price and Consultation */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-20">
                <div>
                  <span className="text-sm text-neutral-60">Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-neutral-90">
                      ${expert.pricePerHour}
                    </span>
                    <span className="text-sm text-neutral-60">/hour</span>
                  </div>
                </div>
                <Button label="Book Consultation" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableExperts;
