import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import Button from "../../../../components/Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import JobDetailsHeader from "../../../../components/Dashboard/JobDetailsPage/JobDetailsHeader/JobDetailsHeader";
import JobDescription from "../../../../components/Dashboard/JobDetailsPage/JobDescription/JobDescription";
import RequiredSkills from "../../../../components/Dashboard/JobDetailsPage/RequiredSkills/RequiredSkills";
import RequiredQualifications from "../../../../components/Dashboard/JobDetailsPage/RequiredQualifications/RequiredQualifications";
import JobResponsibilities from "../../../../components/Dashboard/JobDetailsPage/JobResponsibilities/JobResponsibilities";
import CompanyInformation from "../../../../components/Dashboard/JobDetailsPage/CompanyInformation/CompanyInformation";
import ApplyJobModal from "../../../../components/Dashboard/JobPortalPage/ApplyJobModal/ApplyJobModal";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleJobByIdQuery } from "../../../../redux/Features/Job/jobApi";
import toast from "react-hot-toast";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";

const JobDetails = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { id } = useParams();
  const { data, isLoading } = useGetSingleJobByIdQuery(id);
  const job = data?.data || {};
  const [isApplyJobModalOpen, setIsApplyJobModalOpen] =
    useState<boolean>(false);

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
    (application:string) => application === user?._id,
  );

  if (isLoading) return <LogoLoader />;

  return (
    <div className="font-Manrope">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Job Board", path: "/dashboard/job-portal" },
          { label: job?.title, path: "#" },
        ]}
      />

      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Link to={"/dashboard/job-portal"}>
            <img src={ICONS.arrowLeft} alt="" className="size-5" />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-90">{job?.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleShare}
            variant="secondary"
            leftIcon={ICONS.share}
            className="p-2.25"
          />
          <Button
            onClick={() => setIsApplyJobModalOpen(true)}
            label={isApplied ? "Applied" : "Apply Now"}
            rightIcon={ICONS.arrowRight}
            className="px-4 py-2 text-sm"
            isDisabled={isApplied}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Left Column */}
        <div className="w-full lg:w-[65%] space-y-6">
          {/* Job Header */}
          <JobDetailsHeader job={job} />

          {/* Job Description */}
          <JobDescription description={job?.description} />

          {/* Required Skills */}
          <RequiredSkills requiredSkills={job?.requiredSkills} />

          {/* Qualifications */}
          <RequiredQualifications qualifications={job?.qualifications} />

          {/* Responsibilities */}
          <JobResponsibilities responsibilities={job?.responsibilities} />

          {/* Company Info (Mobile) */}
          <div className="lg:hidden">
            <CompanyInformation
              companyInfo={job?.company}
            />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-[35%] space-y-6 hidden lg:block">
         <CompanyInformation
              companyInfo={job?.company}
            />
        </div>
      </div>

      <ApplyJobModal
        isModalOpen={isApplyJobModalOpen}
        setIsModalOpen={setIsApplyJobModalOpen}
        jobId={id as string}
      />
    </div>
  );
};

export default JobDetails;
