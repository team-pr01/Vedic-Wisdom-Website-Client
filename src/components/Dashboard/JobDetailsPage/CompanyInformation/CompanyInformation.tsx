import {
  FaBuilding,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

interface CompanyInformationProps {
  hiringType: "company" | "individual";
  companyInfo?: {
    name: string;
    logo?: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
    description?: string;
    phoneNumber: string;
    email: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
    tradeLicense?: string;
  };
  individualInfo?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    identityNumber?: string;
    identityDocument?: string;
  };
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({
  hiringType,
  companyInfo,
  individualInfo,
}) => {
  // Render Individual Info
  if (hiringType === "individual") {
    return (
      <div className="bg-white border border-neutral-55 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-10/10 flex items-center justify-center">
            <FaUser className="text-primary-10 text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-neutral-90">
                {individualInfo?.fullName}
              </h3>
              <MdVerified className="text-primary-10" />
            </div>
            <p className="text-sm text-neutral-50">Individual</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <FaPhone className="text-primary-10" />
            <span className="text-neutral-50">
              <span className="text-neutral-90 font-medium">
                {individualInfo?.phoneNumber}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaEnvelope className="text-primary-10" />
            <span className="text-neutral-50">
              <span className="text-neutral-90 font-medium">
                {individualInfo?.email}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaMapMarkerAlt className="text-primary-10" />
            <span className="text-neutral-50">
              <span className="text-neutral-90 font-medium">
                {individualInfo?.address}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render Company Info
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        {companyInfo?.logo ? (
          <img
            src={companyInfo?.logo}
            alt={companyInfo?.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-primary-10/10 flex items-center justify-center">
            <FaBuilding className="text-primary-10 text-xl" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-neutral-90">
              {companyInfo?.name}
            </h3>
            <MdVerified className="text-primary-10" />
          </div>
          <p className="text-sm text-neutral-50">Company</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <FaPhone className="text-primary-10" />
          <span className="text-neutral-50">
            <span className="text-neutral-90 font-medium">
              {companyInfo?.phoneNumber}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaEnvelope className="text-primary-10" />
          <span className="text-neutral-50">
            <span className="text-neutral-90 font-medium">
              {companyInfo?.email}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaMapMarkerAlt className="text-primary-10" />
          <span className="text-neutral-50">
            <span className="text-neutral-90 font-medium">
              {companyInfo?.location?.city}, {companyInfo?.location?.state},{" "}
              {companyInfo?.location?.country}
            </span>
          </span>
        </div>
        {companyInfo?.website && (
          <div className="flex items-center gap-3 text-sm">
            <FaGlobe className="text-primary-10" />
            <a
              href={`https://${companyInfo?.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-10 hover:underline font-medium"
            >
              {companyInfo?.website}
            </a>
          </div>
        )}
        {companyInfo?.tradeLicense && (
          <div className="flex items-center gap-3 text-sm">
            <FaFileAlt className="text-primary-10" />
            <span className="text-neutral-50">
              Trade License:{" "}
              <span className="text-neutral-90 font-medium">
                <a
                  href={companyInfo?.tradeLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-10 hover:underline"
                >
                  View License
                </a>
              </span>
            </span>
          </div>
        )}
      </div>

      {companyInfo?.description && (
        <div className="mt-4 pt-4 border-t border-neutral-20">
          <p className="text-sm text-neutral-50 leading-relaxed">
            {companyInfo?.description}
          </p>
        </div>
      )}

      {companyInfo?.socialMedia && (
        <div className="mt-4 pt-4 border-t border-neutral-20">
          <p className="text-sm font-medium text-neutral-90 mb-2">
            Social Media
          </p>
          <div className="flex gap-3">
            {companyInfo?.socialMedia?.facebook && (
              <a
                href={companyInfo?.socialMedia?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:opacity-80"
              >
                Facebook
              </a>
            )}
            {companyInfo?.socialMedia?.instagram && (
              <a
                href={companyInfo?.socialMedia?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:opacity-80"
              >
                Instagram
              </a>
            )}
            {companyInfo?.socialMedia?.linkedin && (
              <a
                href={companyInfo?.socialMedia?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:opacity-80"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInformation;
