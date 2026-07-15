import { FaUser } from "react-icons/fa";
import { ICONS } from "../../../../../assets";
import { useState } from "react";
import ApplicationDetailsModal from "../ApplicationDetailsModal/ApplicationDetailsModal";

interface Application {
  id: number;
  name: string;
  position: string;
  appliedAt: string;
  status: string;
}

interface RecentApplicationsProps {
  applications: Application[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({
  applications,
}) => {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isViewApplicationModalOpen, setIsViewApplicationModalOpen] =
    useState<boolean>(false);
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
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <div className="bg-white border border-neutral-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-neutral-90 mb-4">
        Recent Applications
      </h3>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-4 bg-white rounded-xl border border-neutral-55 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center">
                <FaUser className="text-primary-10" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-90 text-sm">
                  {app.name}
                </h4>
                <p className="text-xs text-neutral-60">{app.position}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(app.status)}`}
                  >
                    {app.status}
                  </span>
                  <span className="text-xs text-neutral-40 flex items-center gap-1">
                    <img src={ICONS.time} alt="" />
                    {app.appliedAt}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsViewApplicationModalOpen(true);
                  }}
                  className="mt-2 text-xs text-primary-10 hover:underline font-medium"
                >
                  View Application →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-neutral-60">No recent applications</p>
        </div>
      )}

      <ApplicationDetailsModal
        isModalOpen={isViewApplicationModalOpen}
        setIsModalOpen={setIsViewApplicationModalOpen}
        application={selectedApplication}
      />
    </div>
  );
};

export default RecentApplications;
