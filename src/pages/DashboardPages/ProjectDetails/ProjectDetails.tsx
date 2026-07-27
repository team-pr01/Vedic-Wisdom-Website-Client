import {
  IoLocationOutline,
  IoCalendarOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";
import RecentDonors from "../../../components/Dashboard/ProjectDetailsPage/RecentDonors/RecentDonors";
import DonationInfo from "../../../components/Dashboard/ProjectDetailsPage/DonationInfo/DonationInfo";
import { useParams } from "react-router-dom";
import { useGetSingleProjectByIdQuery } from "../../../redux/Features/Project/projectApi";
import type { TProject } from "../../../types/project.type";
import { formatDate } from "../../../utils/formatDate";
import LogoLoader from "../../../components/Shared/LogoLoader/LogoLoader";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProjectByIdQuery(id);
  const project = (data?.data as TProject) || {};

  if (isLoading) return <LogoLoader />;
  return (
    <div className="font-Manrope">
      {/* 1. Category & Title Header */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Dashboard", path: "/dashboard" },
            {
              label: "Projects",
              path: "/dashboard/our-projects",
            },
            {
              label: project?.title,
              path: `/dashboard/project/${project?._id}`,
              isActive: true,
            },
          ]}
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-5 mt-4 leading-tight">
          {project?.title}
        </h2>
        <div className="flex flex-wrap gap-6 mt-4 text-neutral-10 text-sm">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-primary-5" size={18} />
            {project?.location}
          </div>
          <div className="flex items-center gap-2">
            <IoCalendarOutline className="text-primary-5" size={18} />
            Starting from {formatDate(project?.startDate as string)}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN: Content (65%) */}
        <div className="lg:w-[65%] space-y-10">
          {/* Main Image */}
          <div className="relative group">
            <img
              src={project?.imageUrl}
              alt="Project"
              className="w-full aspect-video rounded-[2.5rem] object-cover shadow-xl"
            />
            <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-neutral-5 hover:bg-primary-5 hover:text-white transition-all">
              <IoShareSocialOutline size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-5 mb-4">
              About the Project
            </h3>
            <div
              className="text-neutral-10 text-sm leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: project?.description }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Action & Stats (35%) */}
        <div className="lg:w-[35%] space-y-6">
          {/* Donation Card */}
          <DonationInfo
            currency={project?.currency}
            amountNeeded={project?.amountNeeded || 0}
            amountRaised={project?.amountRaised || 0}
          />

          {/* Recent Donors Card */}
          <RecentDonors currency={project?.currency} donors={project?.donors || []} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
