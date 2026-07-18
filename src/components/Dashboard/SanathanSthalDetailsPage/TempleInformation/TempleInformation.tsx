import { BiGlobe, BiMapPin } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import type { TTemple } from "../../../../types/temple.type";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const TempleInformation = ({ data }: { data: TTemple }) => {
  const templeData = {
    basic: {
      name: data?.basicInfo?.templeName,
      deity: data?.basicInfo?.mainDeity,
      description: data?.basicInfo?.description,
    },
    location: {
      address: data?.location?.address,
      city: data?.location?.city,
      state: data?.location?.state,
      country: data?.location?.country,
    },
    other: {
      established: data?.otherInfo?.establishedYear || "Not provided",
      hours: data?.otherInfo?.visitingHours || "Not provided",
      phone: data?.otherInfo?.phoneNumber || "Not provided",
      email: data?.otherInfo?.email || "Not provided",
    },
  };
  return (
    <div className="lg:w-1/3 space-y-8">
      {/* Basic Information */}
      <section>
        <h2 className="text-xl font-bold text-neutral-90 mb-4">
          Basic information
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-neutral-90 font-bold">Name:</span>{" "}
            {templeData.basic.name}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">Main Deity:</span>{" "}
            {templeData.basic.deity}
          </p>
          <p className="leading-relaxed">
            <span className="text-neutral-90 font-bold">Description:</span>{" "}
            {templeData.basic.description}
          </p>
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="text-xl font-bold text-neutral-90 mb-4">Location</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-neutral-90 font-bold">Address:</span>{" "}
            {templeData.location.address}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">City:</span>{" "}
            {templeData.location.city}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">State / Province:</span>{" "}
            {templeData.location.state}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">Country:</span>{" "}
            {templeData.location.country}
          </p>
        </div>
      </section>

      {/* Other Information */}
      <section>
        <h2 className="text-xl font-bold text-neutral-90 mb-4">
          Other Information
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-neutral-90 font-bold">Established Year:</span>{" "}
            {templeData.other.established}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">Visiting Hours:</span>{" "}
            {templeData.other.hours}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">Phone Number:</span>{" "}
            {templeData.other.phone}
          </p>
          <p>
            <span className="text-neutral-90 font-bold">Email:</span>{" "}
            {templeData.other.email}
          </p>
        </div>
      </section>

      {/* Social Media */}
      <section>
        <h2 className="text-xl font-bold text-neutral-90 mb-4">Social Media</h2>
        <div className="flex gap-4 flex-wrap">
          {/* Facebook */}
          {data?.socialMedia?.facebook && (
            <a
              href={data.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition shadow-sm hover:shadow-md"
            >
              <BiGlobe className="w-5 h-5 text-blue-600" />
            </a>
          )}

          {/* YouTube */}
          {data?.socialMedia?.youtube && (
            <a
              href={data?.socialMedia?.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-red-50 rounded-full border border-red-100 hover:bg-red-100 transition shadow-sm hover:shadow-md"
            >
              <BsYoutube className="w-5 h-5 text-red-600" />
            </a>
          )}

          {/* Instagram */}
          {data?.socialMedia?.instagram && (
            <a
              href={data.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-50 rounded-full border border-pink-100 hover:bg-pink-100 transition shadow-sm hover:shadow-md"
            >
              <FaInstagram className="w-5 h-5 text-pink-600" />
            </a>
          )}

          {/* LinkedIn */}
          {data?.socialMedia?.linkedin && (
            <a
              href={data.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition shadow-sm hover:shadow-md"
            >
              <FaLinkedin className="w-5 h-5 text-blue-700" />
            </a>
          )}

          {/* Google Maps */}
          {data?.location?.googleMapUrl && (
            <a
              href={data.location.googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-50 rounded-full border border-green-100 hover:bg-green-100 transition shadow-sm hover:shadow-md"
            >
              <BiMapPin className="w-5 h-5 text-green-600" />
            </a>
          )}

          {/* No social media available */}
          {!data?.socialMedia?.facebook &&
            !data?.socialMedia?.youtube &&
            !data?.socialMedia?.instagram &&
            !data?.socialMedia?.linkedin &&
            !data?.location?.googleMapUrl && (
              <p className="text-sm text-neutral-40">
                No social media links available
              </p>
            )}
        </div>
      </section>
    </div>
  );
};

export default TempleInformation;
