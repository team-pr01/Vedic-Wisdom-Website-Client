import { IMAGES } from "../../../../assets";

const HoroscopeCard = () => {
  const horoscopeDetails = [
    {
      title: "Color",
      value: "Blue",
    },
    {
      title: "Number",
      value: "4",
    },
    {
      title: "Direction",
      value: "East",
    },
  ];
  return (
    <div className="space-y-4 rounded-xl border border-primary-80 p-4 bg-white font-Manrope h-fit">
      <img src={IMAGES.horoscopeBanner} alt="" className="rounded-lg" />
      <h4 className="text-neutral-90 font-bold mt-3">
        Positive Energy & New Opportunities
      </h4>
      <p className="description mt-1">
        Today brings clarity and calmness to your mind. Focus on important
        decisions and trust your intuition. Small positive actions can lead to
        meaningful results.
      </p>

      <hr className="border border-neutral-70 w-full h-px" />

      <div className="flex justify-between">
        {horoscopeDetails?.map((details) => (
          <div
            key={details?.title}
            className="flex flex-col gap-1 items-center text-center"
          >
            <h3 className="text-neutral-90 font-semibold">{details?.title}</h3>
            <p className="text-neutral-90">{details?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoroscopeCard;
