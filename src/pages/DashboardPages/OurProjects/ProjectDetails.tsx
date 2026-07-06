import {
  IoLocationOutline,
  IoCalendarOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { IMAGES } from "../../../assets";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";
import RecentDonors from "../../../components/Dashboard/ProjectDetailsPage/RecentDonors/RecentDonors";
import DonationInfo from "../../../components/Dashboard/ProjectDetailsPage/DonationInfo/DonationInfo";

const ProjectDetails = () => {
  const recentDonors = [
    { name: "Ankit Sharma", amount: "₹2,500", time: "2 hours ago" },
    { name: "Priya Singh", amount: "₹500", time: "5 hours ago" },
    { name: "Anonymous", amount: "₹10,000", time: "1 day ago" },
  ];

  return (
    <div className="font-Manrope">
      {/* 1. Category & Title Header */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Dashboard", path: "/dashboard", isActive: true },
            {
              label: "Project Details",
              path: "/dashboard/project/1",
              isActive: true,
            },
          ]}
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-5 mt-4 leading-tight">
          Spiritual Learning Center for Underprivileged Children
        </h2>
        <div className="flex flex-wrap gap-6 mt-4 text-neutral-10 text-sm">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-primary-5" size={18} />
            Varanasi, Uttar Pradesh
          </div>
          <div className="flex items-center gap-2">
            <IoCalendarOutline className="text-primary-5" size={18} />
            Started on Oct 10, 2024
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN: Content (65%) */}
        <div className="lg:w-[65%] space-y-10">
          {/* Main Image */}
          <div className="relative group">
            <img
              src={IMAGES.dummyProject}
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
            <p className="text-neutral-10 text-sm leading-relaxed font-medium">
              We aim to establish a state-of-the-art spiritual learning center
              that provides traditional Vedic education combined with modern
              scientific curriculum. This initiative will support 500+ children
              who lack access to quality education and spiritual guidance.
              <br />
              <br />
              The funds will be utilized for constructing classrooms, purchasing
              educational materials, and providing nutritious meals for the
              students.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Action & Stats (35%) */}
        <div className="lg:w-[35%] space-y-6">
          {/* Donation Card */}
          <DonationInfo />

          {/* Recent Donors Card */}
          <RecentDonors recentDonors={recentDonors} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
