import LeaderboardPodium from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/LeaderboardPodium/LeaderboardPodium";
import YourRankCard from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/YourRankCard/YourRankCard";
import Button from "../../../../../components/Reusable/Button/Button";
import LeaderboardWinnerList from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/LeaderboardWinnerList/LeaderboardWinnerList";
import WinnerModal from "../../../../../components/Dashboard/QuizPage/WinnerModal/WinnerModal";
import { useState } from "react";
import CoinsRequestModal from "../../../../../components/Dashboard/QuizPage/CoinsRequestModal/CoinsRequestModal";

// Mock Data
const topThree = [
  {
    id: 1,
    name: "Mr. Raj",
    rank: 2,
    avatar: "https://i.pravatar.cc/150?img=11",
    medalColor: "bg-[#5B9BD5]",
  },
  {
    id: 2,
    name: "Mr. Akash",
    rank: 1,
    avatar: "https://i.pravatar.cc/150?img=12",
    medalColor: "bg-[#E74C3C]",
  },
  {
    id: 3,
    name: "Mr. Harsh",
    rank: 3,
    avatar: "https://i.pravatar.cc/150?img=13",
    medalColor: "bg-[#D35400]",
  },
];

const leaderboardList = [
  {
    id: 1,
    name: "Mr. Akash",
    rank: "01",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Mrs. Sarah",
    rank: "02",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Dr. Liam",
    rank: "03",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Mrs. Emily",
    rank: "04",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    name: "Mrs. Emily",
    rank: "05",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 6,
    name: "Mrs. Emily",
    rank: "06",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
];

const myUser = {
  name: "Mr. Akash",
  rank: "01",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const Leaderboard = () => {
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState<boolean>(false);

  // Handlers for the modal buttons
  const handleGetCoins = () => {
    console.log("User chose to get coins");
    // Call your API to credit coins here
    setIsWinnerModalOpen(false);
    setIsCoinsModalOpen(true);
  };

  const handleReceivePayment = () => {
    console.log("User chose to receive payment");
    // Redirect to payment/bank details form or open a new modal
    setIsWinnerModalOpen(false);
  };
  return (
    <div className="font-Manrope pb-10 max-w-4xl mx-auto">
      <h2 className="text-neutral-90 font-bold text-2xl mb-4 text-center">
        Leaderboard
      </h2>

      <div className="bg-white border border-[#F5ECE0] rounded-2xl overflow-hidden relative shadow-sm flex flex-col min-h-[85vh]">
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-[#FDF8F1] to-white pointer-events-none z-0" />

        <div className="relative z-10 px-6 md:px-12 pt-12 pb-8 flex flex-col items-center flex-1">
          {/* Top 3 Podium */}
          <LeaderboardPodium topThree={topThree} />

          {/* Winners List */}
          <div className="w-full max-w-2xl mb-6">
            <h3 className="text-neutral-90 font-bold text-sm mb-3">Winners</h3>
            <LeaderboardWinnerList list={leaderboardList} />
          </div>
        </div>

        {/* --- STICKY FOOTER (Your Rank + CTA) --- */}
        <div className="z-20 w-full px-6 md:px-12 pb-8 bg-white/90 backdrop-blur-md flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <YourRankCard user={myUser} />

            <div className="mt-4">
              <Button
                label="Claim Your Reward"
                variant="primary"
                className="w-full py-3 text-sm font-bold shadow-md"
                onClick={() => console.log("Claimed")}
              />
            </div>
          </div>
        </div>
      </div>

      <WinnerModal
        isModalOpen={isWinnerModalOpen}
        setIsModalOpen={setIsWinnerModalOpen}
        rewardAmount="$20 Prize"
        onGetCoins={handleGetCoins}
        onReceivePayment={handleReceivePayment}
      />

      <CoinsRequestModal
        isModalOpen={isCoinsModalOpen}
        setIsModalOpen={setIsCoinsModalOpen}
      />
    </div>
  );
};

export default Leaderboard;
