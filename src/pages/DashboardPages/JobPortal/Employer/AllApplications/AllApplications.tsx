import { useState } from "react";
import {
  FaUser,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../../../../components/Reusable/Button/Button";
import Breadcrumb from "../../../../../components/Reusable/Breadcrumb/Breadcrumb";
import ApplicationDetailsModal from "../../../../../components/Dashboard/JobPortalPage/EmployerPage/ApplicationDetailsModal/ApplicationDetailsModal";

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  appliedAt: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "hired";
  experience: string;
  resume: string;
  coverLetter?: string;
  avatar?: string;
}

const AllApplications = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isViewApplicationModalOpen, setIsViewApplicationModalOpen] =
    useState<boolean>(false);

  // Sample applications data
  const applications: Application[] = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior UX/UX Designer",
      appliedAt: "2025-06-15T10:30:00",
      status: "pending",
      experience: "5 years",
      resume: "Arjun_Sharma_Resume.pdf",
      coverLetter: "I am excited to apply for this position...",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 87654 32109",
      position: "Frontend Developer",
      appliedAt: "2025-06-14T14:45:00",
      status: "reviewing",
      experience: "3 years",
      resume: "Priya_Patel_Resume.pdf",
      avatar:
        "https://images.unsplash.com/photo-1494790108373-be9c55b6ee48?w=100",
    },
    {
      id: 3,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 76543 21098",
      position: "Product Manager",
      appliedAt: "2025-06-13T09:15:00",
      status: "shortlisted",
      experience: "7 years",
      resume: "Vikram_Singh_Resume.pdf",
      coverLetter: "With over 7 years of experience...",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    {
      id: 4,
      name: "Ananya Reddy",
      email: "ananya.reddy@email.com",
      phone: "+91 65432 10987",
      position: "Data Analyst",
      appliedAt: "2025-06-12T16:20:00",
      status: "rejected",
      experience: "2 years",
      resume: "Ananya_Reddy_Resume.pdf",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    {
      id: 5,
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "+91 54321 09876",
      position: "Backend Developer",
      appliedAt: "2025-06-11T11:00:00",
      status: "pending",
      experience: "4 years",
      resume: "Rahul_Verma_Resume.pdf",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    {
      id: 6,
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 43210 98765",
      position: "UI/UX Designer",
      appliedAt: "2025-06-10T08:45:00",
      status: "hired",
      experience: "6 years",
      resume: "Sneha_Gupta_Resume.pdf",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "reviewing":
        return "bg-blue-100 text-blue-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "hired":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "reviewing":
        return <FaEye className="text-blue-500" />;
      case "shortlisted":
        return <FaCheckCircle className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      case "hired":
        return <FaCheckCircle className="text-purple-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleViewApplication = (app: Application) => {
    setSelectedApplication(app);
    setIsViewApplicationModalOpen(true);
  };

  return (
    <div className="font-Manrope">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Job Board", path: "/dashboard/job-board" },
          { label: "Data Analyst", path: "#" },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/job-portal/employer"
              className="text-primary-10 hover:underline text-sm"
            >
              ← Back to Jobs
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-neutral-90 mt-1">
            All Applications
          </h1>
          <p className="text-sm text-neutral-60 mt-0.5">
            {applications.length} applications received
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            label="Export All"
            className="px-4 py-2 text-sm"
            leftIcon={<FaDownload />}
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="mt-6 bg-white border border-neutral-20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-10/5 border-b border-neutral-20">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-20">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-neutral-10/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          app.avatar ||
                          `https://ui-avatars.com/api/?name=${app.name}&background=random`
                        }
                        alt={app.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-neutral-90">
                          {app.name}
                        </p>
                        <p className="text-xs text-neutral-60">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-90">{app.position}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-60">
                      {formatDate(app.appliedAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-90">{app.experience}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                    >
                      {getStatusIcon(app.status)}
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewApplication(app)}
                      className="px-3 py-1.5 text-xs font-medium text-primary-10 hover:bg-primary-10/10 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-16">
            <FaUser className="text-4xl text-neutral-30 mx-auto mb-3" />
            <p className="text-neutral-60 font-medium">No applications found</p>
            <p className="text-sm text-neutral-40 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <ApplicationDetailsModal
        isModalOpen={isViewApplicationModalOpen}
        setIsModalOpen={setIsViewApplicationModalOpen}
        application={selectedApplication}
      />
    </div>
  );
};

export default AllApplications;
