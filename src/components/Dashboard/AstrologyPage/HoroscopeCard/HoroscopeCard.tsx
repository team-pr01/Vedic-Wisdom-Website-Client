import { IMAGES } from "../../../../assets";

interface HoroscopeCardProps {
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
}

const HoroscopeCard = ({
  title = "Positive Energy & New Opportunities",
  description = "Today brings clarity and calmness to your mind. Focus on important decisions and trust your intuition. Small positive actions can lead to meaningful results.",
  isLoading = false,
  error = null,
}: HoroscopeCardProps) => {
  const horoscopeDetails = [
    { title: "Color", value: "Blue" },
    { title: "Number", value: "4" },
    { title: "Direction", value: "East" },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-primary-80 p-4 bg-white font-Manrope h-fit">
      {/* Banner Image */}
      <img src={IMAGES.horoscopeBanner} alt="Horoscope" className="rounded-lg w-full object-cover" />
      
      {/* Title */}
      <h4 className="text-neutral-90 font-bold mt-3">{title}</h4>

      {/* Content: Loading, Error, or Description */}
      {isLoading ? (
        <div className="animate-pulse space-y-2 mt-2">
          <div className="h-3 bg-neutral-200 rounded w-full"></div>
          <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-3 bg-neutral-200 rounded w-4/6"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      ) : (
        <p className="description mt-1 text-sm leading-relaxed">{description}</p>
      )}

      {/* Divider & Stats (Only show if not loading/error) */}
      {!isLoading && !error && (
        <>
          <hr className="border border-neutral-70 w-full h-px my-2" />
          <div className="flex justify-between">
            {horoscopeDetails?.map((details) => (
              <div
                key={details?.title}
                className="flex flex-col gap-1 items-center text-center"
              >
                <h3 className="text-neutral-90 font-semibold text-sm">
                  {details?.title}
                </h3>
                <p className="text-neutral-90 text-sm">{details?.value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HoroscopeCard;