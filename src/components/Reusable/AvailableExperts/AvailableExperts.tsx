import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ConsultantCard from "../../Dashboard/ConsultancyPage/ConsultantCard/ConsultantCard";
import { useGetConsultantsByCategoryQuery } from "../../../redux/Features/Consultation/consultantApi";
import type { TConsultant } from "../../../types/consultants.type";

const AvailableExperts = ({
  areaOfExpertise,
  gridDirection = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: {
  areaOfExpertise: string;
  gridDirection?: string;
}) => {
  const { data } = useGetConsultantsByCategoryQuery(areaOfExpertise);
  const availableExperts = data?.data?.data ?? [];

  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
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
        {availableExperts?.map((consultant: TConsultant) => (
          <ConsultantCard key={consultant?._id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default AvailableExperts;
