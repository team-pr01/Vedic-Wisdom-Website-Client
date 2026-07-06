import { BiGlobe, BiMapPin } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";

const TempleInformation = () => {
  const templeData = {
    basic: {
      name: "Golden Temple",
      deity: "Guru Nanak",
      description:
        "A Sacred Sikh Temple Known For Its Spiritual And Cultural Importance.",
    },
    location: {
      address: "Golden Temple Rd, Atta Mandi",
      city: "Amritsar, India",
      state: "Punjab",
      country: "India",
    },
    other: {
      established: "1577",
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 9876543210",
      email: "Info@Goldentemple.Com",
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
        <div className="flex gap-4">
          <a
            href="#"
            className="p-2 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition shadow-sm"
          >
            <BiGlobe className="w-5 h-5 text-blue-600" />
          </a>
          <a
            href="#"
            className="p-2 bg-red-50 rounded-full border border-red-100 hover:bg-red-100 transition shadow-sm"
          >
            <BsYoutube className="w-5 h-5 text-red-600" />
          </a>
          <a
            href="#"
            className="p-2 bg-green-50 rounded-full border border-green-100 hover:bg-green-100 transition shadow-sm"
          >
            <BiMapPin className="w-5 h-5 text-green-600" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default TempleInformation;
