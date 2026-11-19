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
    <div className="bg-gradient-hero border border-neutral-55 rounded-2xl p-4 md:p-6">
      {/* Company + title */}
      <div className="flex items-start gap-3">
        <div className="size-12.5 bg-neutral-30 border border-neutral-86 rounded-md flex items-center justify-center overflow-hidden shrink-0">
          {job?.company?.logo ? (
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="size-8 object-cover"
            />
          ) : (
            <span className="text-neutral-90 font-bold text-lg">
              {getInitials(job?.company?.name)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Title on the left, workMode badge on the right — all sizes */}
          <div className="flex items-start justify-between gap-3">
            <h5 className="text-neutral-90 text-base sm:text-lg font-bold wrap-break-word min-w-0">
              {job?.title}
            </h5>
            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-xs sm:text-sm w-fit capitalize shrink-0">
              {job?.workMode}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-neutral-50 text-sm sm:text-base truncate">
              {job?.company?.name}
            </p>
            <img src={ICONS.checkMark} alt="" className="size-4 mt-1 shrink-0" />
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-neutral-50">
        <span className="flex items-center gap-1.5">
          <FaMapMarkerAlt className="shrink-0" />
          <span className="wrap-break-word">
            {location?.city}, {location?.state}, {location?.country}
          </span>
        </span>
        <span className="hidden sm:block w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5 capitalize">
          <FaBriefcase className="shrink-0" />
          {jobType === "fullTime"
            ? "Full Time"
            : job?.jobType === "partTime"
              ? "Part Time"
              : job?.jobType}
        </span>
        <span className="hidden sm:block w-px h-4 bg-neutral-10" />
        <p className="flex items-center gap-1.5">
          <span className="font-bold">{salary?.currency}</span>{" "}
          {salary?.minimum} - {salary?.maximum}
        </p>
        <span className="hidden sm:block w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5">
          <FaClock className="shrink-0" />
          Posted {formatDate(createdAt as string)}
        </span>
      </div>
    </div>
  );
};

export default JobDetailsHeader;