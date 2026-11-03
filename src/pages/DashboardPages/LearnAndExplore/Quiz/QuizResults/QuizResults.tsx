/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyAllProgressQuery } from "../../../../../redux/Features/Quiz/quizProgressApi";
import DashboardHeading from "../../../../../components/Reusable/DashboardHeading/DashboardHeading";
import LogoLoader from "../../../../../components/Shared/LogoLoader/LogoLoader";
import EmptyState from "../../../../../components/Reusable/EmptyState/EmptyState";
import QuizResultCard from "../../../../../components/Dashboard/QuizPage/QuizResultPage/QuizResultCard/QuizResultCard";

const QuizResults = () => {
  const { data, isLoading } = useGetMyAllProgressQuery({});
  const progress = data?.data || [];

  return (
    <div className="font-Manrope pb-10 min-h-[80vh] flex flex-col">
      <DashboardHeading
        title="Quiz Results"
        description="Track your performance and view your leaderboard rankings."
      />

      {isLoading ? (
        <div className="flex justify-center items-center flex-1">
          <LogoLoader />
        </div>
      ) : progress?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {progress?.map((p: any) => (
            <QuizResultCard key={p._id} result={p} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <EmptyState />
        </div>
      )}
    </div>
  );
};

export default QuizResults;
