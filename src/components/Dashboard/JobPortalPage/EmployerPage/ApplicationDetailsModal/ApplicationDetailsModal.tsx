import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaDollarSign,
  FaClock,
  FaGlobe,
  FaBriefcase,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock as FaClockIcon,
  FaEye,
} from "react-icons/fa";
import Modal from "../../../../Reusable/Modal/Modal";
import Button from "../../../../Reusable/Button/Button";

interface ApplicationDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  salary: string;
  availability: string;
  portfolioUrl: string;
  experienceLevel: string;
  additionalMessage: string;
  position: string;
  appliedAt: string;
  status: string;
  resume: string;
  coverLetter?: string;
  avatar?: string;
}

interface ApplicationDetailsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  application: ApplicationDetails | null;
}

const ApplicationDetailsModal = ({
  isModalOpen,
  setIsModalOpen,
  application,
}: ApplicationDetailsModalProps) => {
  if (!application) return null;

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
        return <FaClockIcon className="text-yellow-500" />;
      case "reviewing":
        return <FaClockIcon className="text-blue-500" />;
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

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-neutral-90">
            Application Details
          </h2>
          <p className="text-sm text-neutral-60 mt-0.5">
            Review applicant information
          </p>
        </div>

        {/* Applicant Profile */}
        <div className="flex items-center gap-4 p-4 bg-neutral-10/5 rounded-2xl border border-neutral-20 my-6">
          <img
            src={
              application.avatar ||
              `https://ui-avatars.com/api/?name=${application.name}&background=random&size=80`
            }
            alt={application.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary-10/20"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-neutral-90">
                {application.name}
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(application.status)} flex items-center gap-1`}
              >
                {getStatusIcon(application.status)}
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-neutral-60">{application.position}</p>
            <p className="text-xs text-neutral-40 mt-0.5">
              Applied on {application.appliedAt}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaUser className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Full Name</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1">
              {application.name}
            </p>
          </div>

          {/* Email */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaEnvelope className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Email Address</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1 truncate">
              {application.email}
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaPhone className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Phone Number</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1">
              {application.phone}
            </p>
          </div>

          {/* Salary */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaDollarSign className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Expected Salary</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1">
              {application.salary || "Not specified"}
            </p>
          </div>

          {/* Availability */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaClock className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Available to Join</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1">
              {application.availability || "Not specified"}
            </p>
          </div>

          {/* Experience Level */}
          <div className="bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaBriefcase className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Experience Level</p>
            </div>
            <p className="text-sm font-medium text-neutral-90 mt-1">
              {application.experienceLevel || "Not specified"}
            </p>
          </div>
        </div>

        {/* Portfolio URL */}
        {application.portfolioUrl && (
          <div className="mt-4 bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaGlobe className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Portfolio URL</p>
            </div>
            <a
              href={application.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-10 hover:underline mt-1 block"
            >
              {application.portfolioUrl}
            </a>
          </div>
        )}

        {/* Additional Message */}
        {application.additionalMessage && (
          <div className="mt-4 bg-white border border-neutral-20 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-10/10 rounded-lg">
                <FaFileAlt className="text-primary-10 text-xs" />
              </div>
              <p className="text-xs text-neutral-40">Additional Message</p>
            </div>
            <p className="text-sm text-neutral-60 mt-1 leading-relaxed">
              {application.additionalMessage}
            </p>
          </div>
        )}

        {/* Resume Download */}
        <div className="mt-4 bg-white border border-neutral-20 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary-10/10 rounded-lg">
              <FaFileAlt className="text-primary-10 text-xs" />
            </div>
            <div>
              <p className="text-xs text-neutral-40">Resume / CV</p>
              <p className="text-sm font-medium text-neutral-90">
                {application.resume}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-10 hover:bg-primary-10/10 rounded-lg transition-colors">
            <FaEye className="text-sm" />
            View CV
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 pt-4 border-t border-neutral-20">
          <Button
            label="Reject"
            variant="secondary"
            className="px-6 py-2 text-sm border-red-500 text-red-500 hover:bg-red-50"
          />
          <Button label="Shortlist" className="px-6 py-2 text-sm" />

          <Button
            label="Hire"
            variant="secondary"
            className="px-6 py-2 text-sm"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationDetailsModal;
