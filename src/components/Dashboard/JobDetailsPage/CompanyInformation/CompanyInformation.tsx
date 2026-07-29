/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

type TCompanyInformationProps = {
  companyInfo: {
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
  };
};

const CompanyInformation: React.FC<TCompanyInformationProps> = ({
  companyInfo,
}) => {
  const contactInfo = [
    {
      id: "phone",
      icon: FaPhone,
      label: "Phone",
      value: companyInfo?.phoneNumber,
      render: (value: string) => (
        <span className="text-neutral-90 font-medium">{value}</span>
      ),
    },
    {
      id: "email",
      icon: FaEnvelope,
      label: "Email",
      value: companyInfo?.email,
      render: (value: string) => (
        <span className="text-neutral-90 font-medium">{value}</span>
      ),
    },
    {
      id: "location",
      icon: FaMapMarkerAlt,
      label: "Location",
      value: companyInfo?.location,
      render: (value: any) => (
        <span className="text-neutral-90 font-medium">
          {value?.city}, {value?.state}, {value?.country}
        </span>
      ),
    },
    {
      id: "website",
      icon: FaGlobe,
      label: "Website",
      value: companyInfo?.website,
      condition: companyInfo?.website,
      render: (value: string) => (
        <a
          href={`https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-10 hover:underline font-medium"
        >
          {value}
        </a>
      ),
    },
  ];
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
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

      {/* Contact info */}
      <div className="space-y-3">
        {contactInfo?.map((item: any) => {
          if (item.condition === false || (!item.condition && !item.value)) {
            return null;
          }

          const Icon = item.icon;

          return (
            <div key={item.id} className="flex items-center gap-3 text-sm">
              <Icon className="text-primary-10" />
              <span className="text-neutral-50">
                {item.render(item?.value)}
              </span>
            </div>
          );
        })}
      </div>

      {companyInfo?.description && (
        <div className="mt-4 pt-4 border-t border-neutral-20">
          <p className="text-sm text-neutral-50 leading-relaxed">
            {companyInfo?.description}
          </p>
        </div>
      )}

      {/* Social media */}
      {companyInfo?.socialMedia && (
        <div className="mt-4 pt-4 border-t border-neutral-20">
          <p className="text-sm font-medium text-neutral-90 mb-2">
            Social Media
          </p>
          <div className="flex gap-3">
            {[
              {
                platform: "Facebook",
                url: companyInfo?.socialMedia?.facebook,
                className: "text-blue-600 hover:opacity-80",
              },
              {
                platform: "Instagram",
                url: companyInfo?.socialMedia?.instagram,
                className: "text-pink-600 hover:opacity-80",
              },
              {
                platform: "LinkedIn",
                url: companyInfo?.socialMedia?.linkedin,
                className: "text-blue-700 hover:opacity-80",
              },
            ]
              .filter((item) => item.url)
              .map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.className} hover:opacity-80 transition-colors`}
                >
                  {item.platform}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInformation;
