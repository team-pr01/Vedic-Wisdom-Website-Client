/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyProgressQuery } from "../../../../redux/Features/Quiz/quizProgressApi";
import QuizLevelCard from "../QuizCard/QuizLevelCard";
import LogoLoader from "../../../Shared/LogoLoader/LogoLoader";

const QuizList = ({ quiz }: any) => {
  const { data: progressData, isLoading } = useGetMyProgressQuery(quiz._id);
  const progress = progressData?.data;

  // Helper to get the status string directly
  const getLevelStatus = (levelNo: number) => {
    if (!progress) {
      return levelNo === 1 ? "unlocked" : "locked";
    }

    const levelStatus = progress.levelProgress.find(
      (l: any) => l.levelNo === levelNo
    )?.status;

    return levelStatus || "locked";
  };

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 mt-10">
        <h3 className="text-neutral-90 font-bold text-2xl">{quiz?.name}</h3>

        <div className="flex items-center gap-2 bg-[#FCF9F2] border border-[#F2E8D9] px-4 py-2 rounded-full shadow-sm w-fit">
          <span className="text-xl">🏆</span>
          <span className="text-sm font-semibold text-neutral-50">
            1st Prize:
          </span>
          <span className="text-lg font-bold text-[#F0B741]">
            {quiz?.prize?.currency}{quiz?.prize?.firstPrize}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
        {quiz?.levels?.map((level: any) => (
          <div key={level.no} className="shrink-0 snap-start">
            <QuizLevelCard 
              status={getLevelStatus(level.no)} 
              level={level} 
              quizId={quiz?._id} 
              isStarted={!!progress} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;