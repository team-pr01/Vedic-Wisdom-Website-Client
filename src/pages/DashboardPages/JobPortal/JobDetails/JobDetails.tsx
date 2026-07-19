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

const JobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleJobByIdQuery(id);
  const job = data?.data || {};
  const [isApplyJobModalOpen, setIsApplyJobModalOpen] =
    useState<boolean>(false);
  // Sample job data
  const jobData = {
    title: "Senior UI/UX Designer",
    company: "Google",
    location: "Bangladesh",
    type: "Full-Time",
    salary: "$80,000 - $120,000",
    postedDate: "2 days ago",
    description:
      "We are looking for a creative and detail-oriented designer to join our team. You will work closely with product managers and developers to create intuitive and engaging user experiences.",
    skills: [
      "UI Design",
      "Figma",
      "UX Design",
      "Prototyping",
      "User Testing",
      "UX Research",
    ],
    qualifications: [
      "Bachelor's degree in Design, HCI, or a related field.",
      "Proficiency in design tools such as Figma, Sketch, or Adobe Creative Suite.",
      "5+ years of experience in UI/UX design.",
      "Strong portfolio demonstrating design thinking.",
    ],
    responsibilities: [
      "Design intuitive user interfaces",
      "Create wireframes and prototypes",
      "Conduct user research and usability testing",
      "Improve usability and accessibility",
      "Collaborate with cross-functional teams",
    ],
    companyInfo: {
      name: "Google",
      industry: "Technology, Information & Internet",
      size: "10,000+ Employees",
      founded: "1998",
      headquarters: "California, USA",
      website: "www.google.com",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna etiam laoreet pharetra arcu lacus. Ac amet tellus turpis quis porttitor vulputate nisl integer in.",
    },
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
            label="Apply Now"
            rightIcon={ICONS.arrowRight}
            className="px-4 py-2 text-sm"
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
          <RequiredSkills skills={job?.requiredSkills} />

          {/* Qualifications */}
          <RequiredQualifications qualifications={jobData.qualifications} />

          {/* Responsibilities */}
          <JobResponsibilities responsibilities={job?.responsibilities} />

          {/* Company Info (Mobile) */}
          <div className="lg:hidden">
            <CompanyInformation
              hiringType={job?.hiringType}
              companyInfo={job?.hiringType === "company" ? job?.company : null}
              individualInfo={
                job?.hiringType === "individual" ? job?.individual : null
              }
            />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-[35%] space-y-6">
          {/* Company Info (Desktop) */}
          <div className="hidden lg:block">
            <CompanyInformation
              hiringType={job?.hiringType}
              companyInfo={job?.hiringType === "company" ? job?.company : null}
              individualInfo={
                job?.hiringType === "individual" ? job?.individual : null
              }
            />
          </div>

          {/* Job Sidebar */}
          {/* <JobSidebar
            type={jobData.type}
            salary={jobData.salary}
            postedDate={jobData.postedDate}
            onApply={handleApply}
          /> */}
        </div>
      </div>

      <ApplyJobModal
        isModalOpen={isApplyJobModalOpen}
        setIsModalOpen={setIsApplyJobModalOpen}
      />
    </div>
  );
};

export default JobDetails;
