import { useState } from "react";
import { ICONS } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import HoroscopeCard from "../../../components/Dashboard/AstrologyPage/HoroscopeCard/HoroscopeCard";
import AvailableExperts from "../../../components/Reusable/AvailableExperts/AvailableExperts";

const Astrology = () => {
  const [selectedZodiac, setSelectedZodiac] = useState<string>("All");
 const zodiacSigns = [
  { label: "♈ Aries", value: "Aries" },
  { label: "♉ Taurus", value: "Taurus" },
  { label: "♊ Gemini", value: "Gemini" },
  { label: "♋ Cancer", value: "Cancer" },
  { label: "♌ Leo", value: "Leo" },
  { label: "♍ Virgo", value: "Virgo" },
  { label: "♎ Libra", value: "Libra" },
  { label: "♏ Scorpio", value: "Scorpio" },
  { label: "♐ Sagittarius", value: "Sagittarius" },
  { label: "♑ Capricorn", value: "Capricorn" },
  { label: "♒ Aquarius", value: "Aquarius" },
  { label: "♓ Pisces", value: "Pisces" }
];
  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Jyotish And Astrology"
          description="Discover the art of Jyotish and astrology to balance your mind, body and soul."
        />
        <Button leftIcon={ICONS.ai} label="AI Reading" />
      </div>

      <div className="flex items-center gap-3 mt-10">
        {zodiacSigns?.map((sign) => (
          <button
            key={sign.label}
            onClick={() => setSelectedZodiac(sign.value)}
            className={`px-4 py-2 rounded-3xl border border-primary-80  hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
              selectedZodiac === sign.value
                ? "bg-primary-10 text-white"
                : "bg-white text-neutral-40"
            }`}
          >
            {sign.label}
          </button>
        ))}
      </div>

      <div className="flex gap-10 mt-6">
        <div className="w-[70%] grid grid-cols-2 gap-4">
          <HoroscopeCard />
          <HoroscopeCard />
        </div>
        <div className="w-[30%]">
          <AvailableExperts
            areaOfExpertise="Astrology"
            gridDirection="grid grid-cols-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Astrology;
