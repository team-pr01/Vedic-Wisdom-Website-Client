import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import type { TJob } from "../../../../types/job.type";
import toast from "react-hot-toast";

const JobCard = ({ job }: { job: TJob }) => {
  const jobAdditionalInfo = [
    {
      icon: ICONS.location,
      value: job?.location?.country,
    },
    {
      icon: ICONS.time,
      value: job?.jobType,
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
        // Fallback for browsers that don't support Web Share API
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

  return (
    <div className="bg-white rounded-xl border border-primary-80 p-3 xl:p-4 flex flex-col gap-4">
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
          <h5 className="text-neutral-90 text-lg font-bold">{job?.title}</h5>
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

      <p className="text-neutral-50 mt-2">
        {job?.description.slice(0, 100)}{" "}
        {job?.description.length > 100 && "..."}
      </p>

      <div className="flex items-center justify-between">
        {jobAdditionalInfo.map((info, index) => (
          <div key={index} className="flex items-center gap-2 capitalize">
            <img src={info.icon} alt="" className="size-4" />
            <p>{info.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-neutral-50/10 h-0.5" />

      <div className="flex items-center justify-between gap-3">
        <Button
          onClick={handleShare}
          variant="secondary"
          leftIcon={ICONS.share}
          className="py-2.75"
        />
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/job/${job?._id}`}>
            <Button variant="secondary" label="View Details" />
          </Link>
          <Button
            variant="primary"
            label="Apply Now"
            rightIcon={ICONS.arrowRight}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
