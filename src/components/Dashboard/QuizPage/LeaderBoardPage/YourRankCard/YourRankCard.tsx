import type { TLeaderboardWinner } from "../LeaderboardPodium/LeaderboardPodium";

const YourRankCard = ({ user }: { user: TLeaderboardWinner }) => {
  console.log(user);
  return (
    <div>
      <h3 className="text-neutral-90 font-bold text-xl mb-3">Your Rank</h3>
      <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#F5E6CC] border border-[#F5B041]/30 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={user.profilePicture as string}
            alt={user.name}
            className="size-14 rounded-full object-cover border border-[#F5B041]"
          />
          <span className="text-neutral-90 font-semibold">{user.name}</span>
        </div>
        <span className="text-neutral-90 font-bold">{user.rank}</span>
      </div>
    </div>
  );
};

export default YourRankCard;
