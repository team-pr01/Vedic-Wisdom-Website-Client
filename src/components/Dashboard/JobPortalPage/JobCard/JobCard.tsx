import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import type { TJob } from "../../../../types/job.type";
import toast from "react-hot-toast";
import ApplyJobModal from "../ApplyJobModal/ApplyJobModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";

const JobCard = ({ job }: { job: TJob }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isApplyJobModalOpen, setIsApplyJobModalOpen] =
    useState<boolean>(false);
  const jobAdditionalInfo = [
    {
      icon: ICONS.location,
      value: `${job?.location?.city}, ${job?.location?.state}, ${job?.location?.country}`,
    },
    {
      icon: ICONS.time,
      value:
        job?.jobType === "fullTime"
          ? "Full Time"
          : job?.jobType === "partTime"
            ? "Part Time"
            : job?.jobType,
    },
    {
      icon: ICONS.experience,
      value: job?.experienceLevel,
    },
  ];

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title || "Check this out!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Share failed:", error);
        toast.error("Failed to share");
      }
    }
  };

  const isApplied = job?.applications?.some(
    (application) => application === user?._id,
  );

  return (
    <>
      <div className="bg-white rounded-xl border border-primary-80 p-4 flex flex-col gap-4 relative">
        {/* Header: logo + title + workMode badge */}
        <div className="flex items-start gap-3 pr-16 sm:pr-20">
          <div className="size-10 sm:size-12.5 bg-neutral-30 border border-neutral-86 rounded-md flex items-center justify-center overflow-hidden shrink-0">
            {job?.company?.logo ? (
              <img
                src={job?.company?.logo}
                alt={job?.company?.name}
                className="size-6 sm:size-8 object-cover"
              />
            ) : (
              <span className="text-neutral-90 font-bold text-base sm:text-lg">
                {getInitials(job?.company?.name)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h5 className="text-neutral-90 text-base sm:text-lg font-bold truncate">
              {job?.title}
            </h5>
            <div className="flex items-center gap-1">
              <p className="text-neutral-50 text-sm sm:text-base truncate">
                {job?.company?.name}
              </p>
              <img
                src={ICONS.checkMark}
                alt=""
                className="size-4 mt-1 shrink-0"
              />
            </div>
          </div>
        </div>

        <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-xs sm:text-sm w-fit absolute top-3 right-3 capitalize">
          {job?.workMode}
        </div>

        <p className="text-neutral-50 text-sm sm:text-base mt-2 line-clamp-2">
          {job?.description.slice(0, 100)}{" "}
          {job?.description.length > 100 && "..."}
        </p>

        {/* Info row — wraps on small screens */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {jobAdditionalInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-2 capitalize text-sm sm:text-base min-w-0"
            >
              <img src={info.icon} alt="" className="size-4 shrink-0" />
              <p className="truncate">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-50/10 h-0.5" />

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={handleShare}
            variant="secondary"
            leftIcon={ICONS.share}
            className="py-2.75 hidden xl:flex"
          />
          <div className="flex items-center gap-2 sm:gap-3 w-full xl:w-auto justify-end">
            <Link to={`/dashboard/job/${job?._id}`} className="flex-1 xl:flex-none">
              <Button
                variant="secondary"
                label="View Details"
                className="w-full xl:w-auto"
              />
            </Link>
            <Button
              variant="primary"
              label={isApplied ? "Applied" : "Apply Now"}
              rightIcon={ICONS.arrowRight}
              onClick={() => setIsApplyJobModalOpen(true)}
              isDisabled={isApplied}
              className="flex-1 xl:flex-none"
            />
          </div>
        </div>
      </div>

      <ApplyJobModal
        isModalOpen={isApplyJobModalOpen}
        setIsModalOpen={setIsApplyJobModalOpen}
        jobId={job?._id as string}
      />
    </>
  );
};

export default JobCard;