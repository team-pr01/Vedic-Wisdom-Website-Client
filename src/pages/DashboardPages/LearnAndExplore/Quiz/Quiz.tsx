/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import QuizList from "../../../../components/Dashboard/QuizPage/QuizList/QuizList";
import { useGetAllQuizzesQuery } from "../../../../redux/Features/Quiz/quizApi";
import QuizListSkeleton from "../../../../components/SkeletonLoaders/QuizListSkeleton/QuizListSkeleton";
import EmptyState from "../../../../components/Reusable/EmptyState/EmptyState";

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data, isLoading, isFetching } = useGetAllQuizzesQuery({
    name: selectedCategory,
  });
  const quizzes = data?.data?.data || [];

  const categories = [
    "All",
    "Jnanarthi",
    "Tattvavetta",
    "Dharmaraksaka",
    "Rishi Siddha",
  ];

  return (
    <div className="font-Manrope flex flex-col min-h-[80vh]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <DashboardHeading
          title="Quiz"
          description="Explore our various spiritual quizzes."
        />

        <div className="flex flex-wrap items-center gap-3">
          {categories?.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
                selectedCategory === category
                  ? "bg-primary-10 text-white"
                  : "bg-white text-neutral-40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex-1 flex flex-col">
        {isLoading || isFetching ? (
          Array.from({ length: 2 }).map((_, index) => (
            <QuizListSkeleton key={index} />
          ))
        ) : quizzes?.length > 0 ? (
          quizzes.map((quiz: any) => <QuizList key={quiz._id} quiz={quiz} />)
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
