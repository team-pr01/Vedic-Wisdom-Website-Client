import { FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";
import { formatDate } from "../../../../utils/formatDate";
import { ICONS } from "../../../../assets";
import type { TJob } from "../../../../types/job.type";

const JobDetailsHeader = ({ job }: { job: TJob }) => {
  const { location, jobType, salary, createdAt } = job || {};
  const getInitials = (name: string): string => {
    if (!name) return "?";

    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    if (words.length === 2) {
      return (
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
      );
    }
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <div className="bg-gradient-hero border border-neutral-55 rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="size-12.5 bg-neutral-30 border border-neutral-86 rounded-md flex items-center justify-center overflow-hidden">
          {job?.hiringType === "company" && job?.company?.logo ? (
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="size-8 object-cover"
            />
          ) : (
            <span className="text-neutral-90 font-bold text-lg">
              {job?.hiringType === "company"
                ? getInitials(job?.company?.name)
                : getInitials(job?.individual?.fullName)}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h5 className="text-neutral-90 text-lg font-bold">{job?.title}</h5>
          <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-sm w-fit capitalize">
            {job?.workMode}
          </div>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-neutral-50">
              {job?.hiringType === "individual"
                ? job?.individual?.fullName
                : job?.company?.name}
            </p>
            <img src={ICONS.checkMark} alt="" className="size-4 mt-1" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-50">
        <span className="flex items-center gap-1.5">
          <FaMapMarkerAlt />
          {location?.city}, {location?.state}, {location?.country}
        </span>
        <span className="w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5 capitalize">
          <FaBriefcase />
          {jobType}
        </span>
        <span className="w-px h-4 bg-neutral-10" />
        {salary?.type === "paid" ? (
          <p className="flex items-center gap-1.5">
            <span className="font-bold">{salary?.currency}</span>{" "}
            {salary?.minimum} - {salary?.maximum}
          </p>
        ) : (
          <p className="flex items-center gap-1.5">Unpaid</p>
        )}
        <span className="w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5">
          <FaClock />
          Posted {formatDate(createdAt as string)}
        </span>
      </div>
    </div>
  );
};

export default JobDetailsHeader;
