/* eslint-disable @typescript-eslint/no-explicit-any */
import LeaderboardPodium from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/LeaderboardPodium/LeaderboardPodium";
import YourRankCard from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/YourRankCard/YourRankCard";
import Button from "../../../../../components/Reusable/Button/Button";
import LeaderboardWinnerList from "../../../../../components/Dashboard/QuizPage/LeaderBoardPage/LeaderboardWinnerList/LeaderboardWinnerList";
import WinnerModal from "../../../../../components/Dashboard/QuizPage/WinnerModal/WinnerModal";
import { useState, useMemo } from "react";
import CoinsRequestModal from "../../../../../components/Dashboard/QuizPage/CoinsRequestModal/CoinsRequestModal";
import { useParams } from "react-router-dom";
import { useGetLeaderboardOfAQuizQuery } from "../../../../../redux/Features/Quiz/quizProgressApi";

const Leaderboard = () => {
  const { quizId } = useParams();
  const { data, isLoading } = useGetLeaderboardOfAQuizQuery(quizId);

  const winners = data?.data?.leaderboard || [];
  const myRank = data?.data?.yourRank;

  const topThree = useMemo(() => winners.slice(0, 3), [winners]);
  const remainingWinners = useMemo(() => winners.slice(3), [winners]);

  // 2. Find the current user's data based on 'yourRank'
  const currentUserData = useMemo(() => {
    return winners.find((w: any) => w.rank === myRank) || winners[0];
  }, [winners, myRank]);

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState<boolean>(false);

  if (isLoading)
    return <div className="text-center py-20">Loading Leaderboard...</div>;
  if (!winners.length)
    return <div className="text-center py-20">No winners yet.</div>;

  return (
    <div className="font-Manrope pb-10 max-w-4xl mx-auto">
      <h2 className="text-neutral-90 font-bold text-2xl mb-4 text-center">
        Leaderboard
      </h2>

      <div className="bg-white border border-[#F5ECE0] rounded-2xl overflow-hidden relative shadow-sm flex flex-col min-h-[85vh]">
        {/* Top Gradient Background */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-[#FDF8F1] to-white pointer-events-none z-0" />

        <div className="relative z-10 px-6 md:px-12 pt-12 pb-8 flex flex-col items-center flex-1">
          {/* Top 3 Podium */}
          <LeaderboardPodium topThree={topThree} />

          {/* Winners List (Remaining 4th place downwards) */}
          {remainingWinners.length > 0 && (
            <div className="w-full max-w-2xl mb-6">
              <h3 className="text-neutral-90 font-bold text-sm mb-3">
                Winners
              </h3>
              <LeaderboardWinnerList winners={remainingWinners} />
            </div>
          )}
        </div>

        {/* --- STICKY FOOTER (Your Rank + CTA) --- */}
        <div className="z-20 w-full px-6 md:px-12 pb-8 bg-white/90 backdrop-blur-md flex flex-col items-center mt-auto">
          <div className="w-full max-w-2xl">
            {/* Display current user's rank */}
            {currentUserData && <YourRankCard user={currentUserData} />}

            <div className="mt-4">
              <Button
                label="Claim Your Reward"
                variant="primary"
                className="w-full py-3 text-sm font-bold shadow-md"
                onClick={() => setIsWinnerModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <WinnerModal
        isModalOpen={isWinnerModalOpen}
        setIsModalOpen={setIsWinnerModalOpen}
        quizId={quizId || ""}
        rewardCurrency={data?.data?.currency || ""}
        rewardAmount={data?.data?.yourPrize || 0}
      />

      <CoinsRequestModal
        isModalOpen={isCoinsModalOpen}
        setIsModalOpen={setIsCoinsModalOpen}
      />
    </div>
  );
};

export default Leaderboard;
