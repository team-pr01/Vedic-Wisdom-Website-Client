type TLeaderboardUser = {
  id: number;
  name: string;
  rank: string;
  avatar: string;
};

const LeaderboardWinnerList = ({ list }: { list: TLeaderboardUser[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {list.map((user, index) => (
        <div
          key={user.id}
          className={`flex items-center justify-between px-4 py-2 rounded-lg border ${
            index === 0 || index === 1 || index === 2
              ? "bg-[#FDF8F1] border-[#F9EEDC]" 
              : "bg-white border-[#F2E8D9]"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-14 rounded-full object-cover border border-neutral-200"
            />
            <span className="text-neutral-90 font-semibold">{user.name}</span>
          </div>
          <span className="text-neutral-90 font-bold">{user.rank}</span>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardWinnerList;