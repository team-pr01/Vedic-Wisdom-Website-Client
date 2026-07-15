import { useState } from "react";
import {
  FaBriefcase,
  FaDollarSign,
  FaClock,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";
import { ICONS, IMAGES } from "../../../../assets";
import JobApplyForm from "./JobApplyForm/JobApplyForm";

interface ApplyJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ApplyJobModal = ({ isModalOpen, setIsModalOpen }: ApplyJobModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Job Data
  const jobData = {
    title: "Senior UI/UX Designer",
    company: "Google",
    location: "Bangladeshi",
    flag: "🇬🇧",
    salary: "$80k - $100k",
    type: "Full-Time",
    workExperience: "Remote",
    level: "3-5 Years Exp",
    deadline: "30 June 2026",
    vacancies: "3 Candidates",
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  // Success Content
  if (isSubmitted) {
    return (
      <Modal isModalOpen={isModalOpen} setIsModalOpen={handleClose}>
        <div className="flex flex-col items-center text-center py-3">
          <img src={IMAGES.successTick} alt="Success" className="w-20 h-20" />
          <h2 className="text-neutral-90 text-2xl font-bold mt-6">
            Application Submitted
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
            Your application is under admin review. You will be notified once
            approved.
          </p>
          <Button label="Close" className="mt-6 px-8" onClick={handleClose} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      width="w-[90%] sm:w-[95%] lg:w-[90%] xl:w-[80%] 2xl:w-[60%]"
      isModalOpen={isModalOpen}
      setIsModalOpen={handleClose}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side - Job Info */}
        <div className="lg:col-span-2 bg-neutral-10/5 rounded-2xl p-6 border border-neutral-20 flex flex-col justify-between">
          <div>
            {/* Job Header */}
            <div className="mb-6 text-center flex flex-col items-center">
              <h2 className="text-xl font-bold text-neutral-90">
                {jobData.title}
              </h2>
              <div className="flex items-center gap-1 text-sm">
                <p className="text-neutral-10">google</p>
                <img src={ICONS.checkMark} alt="" className="size-4" />
              </div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <img src={ICONS.location} alt="" className="size-4" />
                <p className="text-neutral-50">Bangladesh</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  icon: <FaDollarSign className="text-primary-10" />,
                  label: "Salary (Monthly)",
                  value: jobData.salary,
                },
                {
                  id: 2,
                  icon: <FaBriefcase className="text-primary-10" />,
                  label: "Job Type",
                  value: jobData.type,
                },
                {
                  id: 3,
                  icon: <FaBuilding className="text-primary-10" />,
                  label: "Work Experience",
                  value: jobData.workExperience,
                },
                {
                  id: 4,
                  icon: <FaClock className="text-primary-10" />,
                  label: "Level",
                  value: jobData.level,
                },
                {
                  id: 5,
                  icon: <FaCalendarAlt className="text-primary-10" />,
                  label: "Deadline",
                  value: jobData.deadline,
                },
                {
                  id: 6,
                  icon: <FaUsers className="text-primary-10" />,
                  label: "Vacancies",
                  value: jobData.vacancies,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-white border border-neutral-55 p-2 rounded-lg"
                >
                  <div className="p-2 bg-primary-10/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-40">{item.label}</p>
                    <p className="font-semibold text-neutral-90">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-neutral-10 text-center">
            Your information will be kept private.
          </p>
        </div>

        {/* Right Side - Application Form */}
        <div className="lg:col-span-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <JobApplyForm setIsSubmitted={setIsSubmitted} />
        </div>
      </div>
    </Modal>
  );
};

export default ApplyJobModal;
