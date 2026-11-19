import { FaStar } from "react-icons/fa";
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
  const [selectedConsultant, setSelectedConsultant] =
    useState<TConsultant | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-20 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Header with Image and Status */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <img
                src={consultant?.imageUrl}
                alt={consultant?.name}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-primary-10/20"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <h3 className="text-neutral-90 font-bold text-base sm:text-lg truncate">
                      {consultant?.name}
                    </h3>
                    <MdVerified className="text-primary-10 text-base sm:text-lg shrink-0" />
                  </div>
                  <p className="text-primary-10 text-xs sm:text-sm font-medium capitalize truncate">
                    {consultant?.category} Expert
                  </p>
                </div>

                {/* Rating pinned right */}
                <div className="flex items-center gap-1 shrink-0">
                  <FaStar className="text-yellow-400 text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-90">
                    {consultant?.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                {consultant?.specialties?.map((speciality) => (
                  <div
                    key={speciality}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-primary-50 text-neutral-5 text-[10px] text-center"
                  >
                    <span>{speciality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Grid — 1 col until lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-20">
            <div className="flex items-center gap-2 min-w-0">
              <FiClock className="text-neutral-40 text-sm shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-60 truncate">
                {consultant?.experience} experience
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <HiOutlineUserGroup className="text-primary-10 shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-60 truncate">
                Online Consultation Available
              </span>
            </div>
          </div>

          {/* Price and Consultation — stacked until lg */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-20">
            <div>
              <span className="text-xs sm:text-sm text-neutral-60">
                Consultation Fee
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-neutral-90">
                  {consultant?.fees}
                </span>
                <span className="text-xs sm:text-sm text-neutral-60">/hour</span>
              </div>
            </div>
            <Button
              label="Book Consultation"
              className="py-2.5 w-full lg:w-auto"
              onClick={() => {
                setSelectedConsultant(consultant);
                setIsBookConsultationModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <BookConsultationModal
        isModalOpen={isBookConsultationModalOpen}
        setIsModalOpen={setIsBookConsultationModalOpen}
        consultant={selectedConsultant as TConsultant}
      />
    </>
  );
};

export default ConsultantCard;