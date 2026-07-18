import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import Button from "../../../Reusable/Button/Button";
import { useState } from "react";
import BookConsultationModal from "../BookConsultationModal/BookConsultationModal";
import type { TConsultant } from "../../../../types/consultants.type";

const ConsultantCard = ({ consultant }: { consultant: TConsultant }) => {
  const [isBookConsultationModalOpen, setIsBookConsultationModalOpen] =
    useState<boolean>(false);
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
    <>
      <div className="bg-white rounded-2xl border border-neutral-20 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
        <div className="p-6">
          {/* Header with Image and Status */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={consultant?.imageUrl}
                alt={consultant?.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-10/20"
              />
              {/* {consultant?.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-1 border-2 border-white">
                  <span className="block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              )} */}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-neutral-90 font-bold text-lg truncate">
                  {consultant?.name}
                </h3>
                <MdVerified className="text-primary-10 text-lg shrink-0" />
              </div>
              <p className="text-primary-10 text-sm font-medium capitalize">
                {consultant?.category} Expert
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-semibold text-neutral-90">
                  {consultant?.rating}
                </span>
                <div className="flex items-center gap-0.5">
                  {renderStars(consultant?.rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-20">
            <div className="flex items-center gap-2">
              <FiClock className="text-neutral-40 text-sm" />
              <span className="text-sm text-neutral-60">
                {consultant?.experience} experience
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
              <span className="text-sm text-neutral-60">Consultation Fee</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-neutral-90">
                  {consultant?.fees}
                </span>
                <span className="text-sm text-neutral-60">/hour</span>
              </div>
            </div>
            <Button
              label="Book Consultation"
              className="py-2.5"
              onClick={() => setIsBookConsultationModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <BookConsultationModal
        isModalOpen={isBookConsultationModalOpen}
        setIsModalOpen={setIsBookConsultationModalOpen}
      />
    </>
  );
};

export default ConsultantCard;
