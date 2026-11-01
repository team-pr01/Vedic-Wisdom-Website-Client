/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import QuizList from "../../../../components/Dashboard/QuizPage/QuizList/QuizList";
import { useGetAllQuizzesQuery } from "../../../../redux/Features/Quiz/quizApi";

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data } = useGetAllQuizzesQuery({});
  const quizzes = data?.data?.data || [];
  console.log(quizzes);
  const categories = [
    "All",
    "Free",
    "Jnanarthi",
    "Tattvavetta",
    "Dharmaraksaka",
    "Rishi Siddha",
  ];

  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Quiz"
          description="Explore our various spiritual quizzes."
        />

        <div className="flex flex-wrap items-center gap-3 flex-wrap">
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

      <div className="mt-8 flex flex-col gap-8">
        {quizzes?.map((quiz:any) => (
          <QuizList key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
