import { FaBuilding } from "react-icons/fa";
import { ICONS } from "../../../../../assets";

interface Job {
  id: number;
  title: string;
  company: string;
  postedAt: string;
  applications: number;
  status: string;
}

interface JobListProps {
  jobs: Job[];
  getStatusColor: (status: string) => string;
  onEdit: (id: number) => void;
  onViewApplications: (id: number) => void;
  onDelete: (id: number) => void;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  getStatusColor,
  onViewApplications,
  onDelete,
}) => {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-45 rounded-xl border border-neutral-55 hover:shadow-md transition-shadow gap-3"
        >
          {/* Job Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-neutral-90">{job.title}</h4>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${getStatusColor(job.status)}`}
              >
                {job.status}
              </span>
            </div>
            <p className="text-sm text-neutral-60 flex items-center gap-1">
              <FaBuilding className="text-primary-10 text-xs" />
              {job.company}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-neutral-40 flex items-center gap-1">
                <img src={ICONS.time} alt="" />
                Posted: {job.postedAt}
              </span>
              <span className="text-xs text-neutral-40 flex items-center gap-1">
                <img src={ICONS.user} alt="" className="size-3.5" />
                {job.applications} Applications
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete(job.id)}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Delete Job
            </button>
            <button
              onClick={() => onViewApplications(job.id)}
              className="px-3 py-1.5 text-xs font-medium text-primary-10 bg-primary-50 hover:bg-primary-10 hover:text-white rounded-lg transition-colors"
            >
              View Applications
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
