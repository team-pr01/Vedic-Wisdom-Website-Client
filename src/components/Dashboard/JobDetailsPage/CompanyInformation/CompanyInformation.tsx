import { FaBuilding, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

interface CompanyInformationProps {
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    founded: string;
    headquarters: string;
    website: string;
    description: string;
  };
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ companyInfo }) => {
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-10/10 flex items-center justify-center">
          <FaBuilding className="text-primary-10 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neutral-90">{companyInfo.name}</h3>
          <p className="text-sm text-neutral-50">{companyInfo.industry}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <FaUsers className="text-primary-10" />
          <span className="text-neutral-50">Company Size: <span className="text-neutral-90 font-medium">{companyInfo.size}</span></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaCalendarAlt className="text-primary-10" />
          <span className="text-neutral-50">Founded: <span className="text-neutral-90 font-medium">{companyInfo.founded}</span></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaMapMarkerAlt className="text-primary-10" />
          <span className="text-neutral-50">Headquarters: <span className="text-neutral-90 font-medium">{companyInfo.headquarters}</span></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaGlobe className="text-primary-10" />
          <a
            href={`https://${companyInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-10 hover:underline font-medium"
          >
            {companyInfo.website}
          </a>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-20">
        <p className="text-sm text-neutral-50 leading-relaxed">
          {companyInfo.description}
        </p>
      </div>
    </div>
  );
};

export default CompanyInformation;