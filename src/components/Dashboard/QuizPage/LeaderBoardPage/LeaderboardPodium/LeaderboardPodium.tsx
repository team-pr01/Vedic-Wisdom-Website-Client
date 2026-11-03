import { FaCrown, FaUser } from "react-icons/fa";

const LeaderboardPodium = ({ topThree }) => {
  console.log(topThree);
  return (
    <div className="flex items-end justify-center gap-6 md:gap-12 mb-10 w-full max-w-2xl">
      {/* 2nd Place */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {topThree[1].profilePicture ? (
            <img
              src={topThree[1].profilePicture}
              alt={topThree[1].name}
              referrerPolicy="no-referrer"
              className="size-30 rounded-full object-cover border-2 border-neutral-50/20 shadow-md"
            />
          ) : (
            <div className="size-30 rounded-full bg-gray-200 flex items-center justify-center border-2 border-neutral-50/20 shadow-md">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 bg-[#5B9BD5] rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
            <span className="text-white text-[10px] md:text-xs font-bold">
              2
            </span>
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-sm md:text-base text-center">
          {topThree[0].name}
        </h4>
        <div className="mt-2 w-16 md:w-20 py-1 bg-white border border-primary-10 rounded-full text-center text-sm font-bold text-neutral-90">
          02
        </div>
      </div>

      {/* 1st Place */}
      <div className="flex flex-col items-center -mt-6">
        <div className="relative">
          {topThree[0].profilePicture ? (
            <img
              src={topThree[0].profilePicture}
              alt={topThree[0].name}
              referrerPolicy="no-referrer"
              className="size-40 rounded-full object-cover border-2 border-primary-10 shadow-lg"
            />
          ) : (
            <div className="size-40 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary-10 shadow-lg">
              <FaUser className="text-gray-400 text-5xl" />
            </div>
          )}
          <div className="absolute bottom-1 right-1 w-7 h-7 md:w-8 md:h-8 bg-[#E74C3C] rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
            <FaCrown className="text-white text-xs md:text-sm" />
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-2xl text-center">
          {topThree[1].name}
        </h4>
        <div className="mt-2 w-20 md:w-45 py-3 bg-gradient-primary-button rounded-full text-center text-xl font-bold text-neutral-5 shadow-sm">
          01
        </div>
      </div>

      {/* 3rd Place */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {topThree[2].profilePicture ? (
            <img
              src={topThree[2].profilePicture}
              alt={topThree[2].name}
              referrerPolicy="no-referrer"
              className="size-30 rounded-full object-cover border-2 border-neutral-50/20 shadow-md"
            />
          ) : (
            <div className="size-30 rounded-full bg-gray-200 flex items-center justify-center border-2 border-neutral-50/20 shadow-md">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 bg-[#D35400] rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
            <span className="text-white text-[10px] md:text-xs font-bold">
              3
            </span>
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-sm md:text-base text-center">
          {topThree[2].name}
        </h4>
        <div className="mt-2 w-16 md:w-20 py-1 bg-white border border-primary-10 rounded-full text-center text-sm font-bold text-neutral-90">
          03
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPodium;
