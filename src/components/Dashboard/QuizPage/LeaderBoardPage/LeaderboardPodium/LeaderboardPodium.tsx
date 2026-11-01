import { FaCrown } from "react-icons/fa";

type TPodiumUser = {
  id: number;
  name: string;
  rank: number;
  avatar: string;
  medalColor: string;
};

const LeaderboardPodium = ({ topThree }: { topThree: TPodiumUser[] }) => {
  return (
    <div className="flex items-end justify-center gap-6 md:gap-12 mb-10 w-full max-w-2xl">
      {/* 2nd Place */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={topThree[0].avatar}
            alt={topThree[0].name}
            className="size-30 rounded-full object-cover border-2 border-neutral-50/20 shadow-md"
          />
          <div className={`absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 ${topThree[0].medalColor} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
            <span className="text-white text-[10px] md:text-xs font-bold">2</span>
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-sm md:text-base">{topThree[0].name}</h4>
        <div className="mt-2 w-16 md:w-20 py-1 bg-white border border-primary-10 rounded text-center text-sm font-bold text-neutral-90">
          02
        </div>
      </div>

      {/* 1st Place */}
      <div className="flex flex-col items-center -mt-6">
        <div className="relative">
          <img
            src={topThree[1].avatar}
            alt={topThree[1].name}
            className="size-40 rounded-full object-cover border-2 border-primary-10 shadow-lg"
          />
          <div className={`absolute bottom-1 right-1 w-7 h-7 md:w-8 md:h-8 ${topThree[1].medalColor} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
            <FaCrown className="text-white text-xs md:text-sm" />
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-2xl">{topThree[1].name}</h4>
        <div className="mt-2 w-20 md:w-45 py-3 bg-primary-10 border border-primary-10 rounded text-center text-sm font-bold text-white shadow-sm">
          01
        </div>
      </div>

      {/* 3rd Place */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={topThree[2].avatar}
            alt={topThree[2].name}
            className="size-30 rounded-full object-cover border-2 border-neutral-50/20 shadow-md"
          />
          <div className={`absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 ${topThree[2].medalColor} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
            <span className="text-white text-[10px] md:text-xs font-bold">3</span>
          </div>
        </div>
        <h4 className="text-neutral-90 font-bold mt-3 text-sm md:text-base">{topThree[2].name}</h4>
        <div className="mt-2 w-16 md:w-20 py-1 bg-white border border-primary-10 rounded text-center text-sm font-bold text-neutral-90">
          03
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPodium;