import { FaCheckCircle } from "react-icons/fa";

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

const JobResponsibilities: React.FC<JobResponsibilitiesProps> = ({ responsibilities }) => {
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-neutral-90 mb-3">Responsibilities</h3>
      <ul className="space-y-2">
        {responsibilities.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-50">
            <FaCheckCircle className="text-primary-10 text-sm mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobResponsibilities;