import { useState } from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import Button from "../../../../../components/Reusable/Button/Button";
import StatCard from "../../../../../components/Dashboard/JobPortalPage/EmployerPage/StatCard/StatCard";
import RecentApplications from "../../../../../components/Dashboard/JobPortalPage/EmployerPage/RecentApplications/RecentApplications";
import JobList from "../../../../../components/Dashboard/JobPortalPage/EmployerPage/JobList/JobList";
import { ICONS } from "../../../../../assets";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "pending" | "rejected"
  >("all");

  // Stats Data
  const stats = [
    {
      id: 1,
      title: "Total Posted Jobs",
      value: 12,
      icon: <FaBriefcase className="text-white" />,
      color: "bg-primary-10",
      change: "+2 this month",
    },
    {
      id: 2,
      title: "Pending Approval",
      value: 9,
      icon: <MdPendingActions className="text-white" />,
      color: "bg-yellow-500",
      change: "Awaiting review",
    },
    {
      id: 3,
      title: "Approved Jobs",
      value: 8,
      icon: <FaCheckCircle className="text-white" />,
      color: "bg-green-500",
      change: "80% approved",
    },
    {
      id: 4,
      title: "Rejected Jobs",
      value: 3,
      icon: <FaTimesCircle className="text-white" />,
      color: "bg-red-500",
      change: "Need attention",
    },
    {
      id: 5,
      title: "Total Applications",
      value: 200,
      icon: <FaUsers className="text-white" />,
      color: "bg-purple-500",
      change: "+45 this week",
    },
  ];

  // Recent Applications Data
  const recentApplications = [
    {
      id: 1,
      name: "Arjun Sharma",
      position: "Senior UX/UX Designer",
      appliedAt: "1-3 hrs ago",
      status: "pending",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Frontend Developer",
      appliedAt: "2 hrs ago",
      status: "reviewing",
    },
    {
      id: 3,
      name: "Vikram Singh",
      position: "Product Manager",
      appliedAt: "5 hrs ago",
      status: "shortlisted",
    },
    {
      id: 4,
      name: "Ananya Reddy",
      position: "Data Analyst",
      appliedAt: "1 day ago",
      status: "rejected",
    },
    {
      id: 5,
      name: "Rahul Verma",
      position: "Backend Developer",
      appliedAt: "3 hrs ago",
      status: "pending",
    },
    {
      id: 6,
      name: "Sneha Gupta",
      position: "UI/UX Designer",
      appliedAt: "4 hrs ago",
      status: "reviewing",
    },
    {
      id: 7,
      name: "Amit Kumar",
      position: "DevOps Engineer",
      appliedAt: "6 hrs ago",
      status: "shortlisted",
    },
    {
      id: 8,
      name: "Kavya Nair",
      position: "Content Writer",
      appliedAt: "1 day ago",
      status: "pending",
    },
  ];

  // Posted Jobs Data
  const postedJobs = [
    {
      id: 1,
      title: "Data Analyst",
      company: "Microsoft",
      postedAt: "10 June 2025",
      applications: 25,
      status: "active",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "NASA",
      postedAt: "15 June 2025",
      applications: 50,
      status: "active",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "Amazon",
      postedAt: "20 June 2025",
      applications: 50,
      status: "pending",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Google",
      postedAt: "25 June 2025",
      applications: 30,
      status: "active",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Microsoft",
      postedAt: "28 June 2025",
      applications: 15,
      status: "rejected",
    },
  ];

  const filteredJobs = postedJobs.filter((job) => {
    if (activeTab === "all") return true;
    return job.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <div className="font-Manrope">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-90">
            Welcome Back, Mr. Akash
          </h1>
          <p className="text-sm text-neutral-60 mt-1">
            Here's what's happening with your job posts
          </p>
        </div>
        <Button
          label="Post a New Job"
          className="px-6 py-2.5"
          leftIcon={ICONS.plus}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Applications */}
        <div className="lg:col-span-1">
          <RecentApplications applications={recentApplications} />
        </div>

        {/* My Jobs */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-neutral-20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-neutral-90">My Jobs</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeTab === "all"
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeTab === "active"
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeTab === "pending"
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeTab === "rejected"
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            <JobList
              jobs={filteredJobs}
              getStatusColor={getStatusColor}
              onEdit={(id) => console.log("Edit job:", id)}
              onViewApplications={(id) => console.log("View applications:", id)}
              onDelete={(id) => console.log("Delete job:", id)}
            />

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-60">
                  No jobs found in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
