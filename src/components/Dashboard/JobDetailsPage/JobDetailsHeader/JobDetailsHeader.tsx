import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";

interface JobDetailsHeaderProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
}

const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
  title,
  company,
  location,
  type,
  salary,
  postedDate,
}) => {
  return (
    <div className="bg-gradient-hero border border-neutral-55 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-neutral-90">{title}</h2>
      <p className="text-lg font-medium text-neutral-90 mt-1">{company}</p>
      
      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-50">
        <span className="flex items-center gap-1.5">
          <FaMapMarkerAlt />
          {location}
        </span>
        <span className="w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5">
          <FaBriefcase />
          {type}
        </span>
        <span className="w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5">
          <FaDollarSign />
          {salary}
        </span>
        <span className="w-px h-4 bg-neutral-10" />
        <span className="flex items-center gap-1.5">
          <FaClock />
          Posted {postedDate}
        </span>
      </div>
    </div>
  );
};

export default JobDetailsHeader;