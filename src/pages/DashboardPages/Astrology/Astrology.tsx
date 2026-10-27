/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { ICONS } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import HoroscopeCard from "../../../components/Dashboard/AstrologyPage/HoroscopeCard/HoroscopeCard";
import AvailableExperts from "../../../components/Reusable/AvailableExperts/AvailableExperts";
import AIReading from "../../../components/Dashboard/AstrologyPage/AIReading/AIReading";

const Astrology = () => {
  const [isAiReadingModalOpen, setIsAiReadingModalOpen] =
    useState<boolean>(false);

  const [selectedZodiac, setSelectedZodiac] = useState<string>("All");

  // API States
  const [day, setDay] = useState<string>("today");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [horoscopes, setHoroscopes] = useState<Record<string, string>>({});

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
    { label: "♓ Pisces", value: "Pisces" },
  ];

  const dayOptions = [
    { label: "Today", value: "today" },
    { label: "Previous Day", value: "previous" },
    { label: "Tomorrow", value: "tomorrow" },
  ];

  const fetchHoroscopes = async () => {
    try {
      setLoading(true);
      setError(null);

      if (selectedZodiac === "All") {
        // Fetch all 12 signs concurrently using Promise.all
        const promises = zodiacSigns.map(async (sign) => {
          const res = await fetch(
            `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${sign.value}`,
          );
          const data = await res.json();
          return {
            sign: sign.value,
            text: data?.data?.horoscope || "No data.",
          };
        });

        const results = await Promise.all(promises);

        // Convert array of results into an object: { Aries: "...", Taurus: "..." }
        const newHoroscopes: Record<string, string> = {};
        results.forEach((item) => {
          newHoroscopes[item.sign] = item.text;
        });

        setHoroscopes(newHoroscopes);
      } else {
        // Fetch single sign
        const res = await fetch(
          `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${selectedZodiac}`,
        );
        const data = await res.json();
        const text =
          data?.data?.horoscope || "No horoscope available for this sign.";

        setHoroscopes({ [selectedZodiac]: text });
      }
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setError("Failed to fetch horoscope. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger API on change
  useEffect(() => {
    fetchHoroscopes();
  }, [selectedZodiac, day]);

  // Filter the signs to display based on selection
  const signsToDisplay =
    selectedZodiac === "All"
      ? zodiacSigns
      : zodiacSigns.filter((sign) => sign.value === selectedZodiac);

  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Jyotish And Astrology"
          description="Discover the art of Jyotish and astrology to balance your mind, body and soul."
        />
        <Button
          onClick={() => setIsAiReadingModalOpen(true)}
          leftIcon={ICONS.ai}
          label="AI Reading"
          className="py-2.5"
        />
      </div>

      {/* Zodiac Sign Selector */}
      <div className="flex flex-wrap items-center gap-3 mt-10">
        <button
          onClick={() => setSelectedZodiac("All")}
          className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm font-medium ${
            selectedZodiac === "All"
              ? "bg-primary-10 text-white"
              : "bg-white text-neutral-40"
          }`}
        >
          All Zodiac Signs
        </button>

        {zodiacSigns.map((sign) => (
          <button
            key={sign.label}
            onClick={() => setSelectedZodiac(sign.value)}
            className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
              selectedZodiac === sign.value
                ? "bg-primary-10 text-white"
                : "bg-white text-neutral-40"
            }`}
          >
            {sign.label}
          </button>
        ))}
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-3 mt-6">
        <span className="text-sm font-semibold text-neutral-60">
          Select Day:
        </span>
        {dayOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setDay(option.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              day === option.value
                ? "bg-primary-10 text-white"
                : "bg-neutral-10/10 text-neutral-10 hover:bg-neutral-10/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex gap-10 mt-6">
        <div className="w-[70%] grid grid-cols-1 lg:grid-cols-2 gap-4">
          {signsToDisplay.map((sign) => {
            let displayText = horoscopes[sign.value] || "";

            // Simulate day variation for the UI
            if (displayText && day === "previous") {
              displayText = "Yesterday: " + displayText;
            } else if (displayText && day === "tomorrow") {
              displayText = "Tomorrow: " + displayText;
            }

            return (
              <HoroscopeCard
                key={sign.value}
                title={`${sign.label} Daily Horoscope`}
                description={displayText}
                isLoading={loading}
                error={error}
              />
            );
          })}
        </div>

        <div className="w-[30%]">
          <AvailableExperts
            areaOfExpertise="Astrology"
            gridDirection="grid grid-cols-1"
          />
        </div>
      </div>

      <AIReading
        isModalOpen={isAiReadingModalOpen}
        setIsModalOpen={setIsAiReadingModalOpen}
      />
    </div>
  );
};

export default Astrology;
