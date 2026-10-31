import { useState } from "react";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import QuizCard from "../../../../components/Dashboard/QuizPage/QuizCard/QuizCard";

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = [
    "All",
    "Free",
    "Jnanarthi",
    "Tattvavetta",
    "Dharmaraksaka",
    "Rishi Siddha",
  ];

  const quizData = [
    { id: 1, variant: "unlock" },
    { id: 2, variant: "lock" },
    { id: 3, variant: "lock" },
    { id: 4, variant: "lock" },
    { id: 5, variant: "lock" },
    { id: 6, variant: "lock" },
    { id: 7, variant: "lock" },
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

      <div className="mt-8">
        <h3 className="text-neutral-90 font-bold text-2xl">Jnanarthi</h3>

        <div className="flex items-center gap-4 mt-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {quizData.map((quiz) => (
            <div key={quiz.id} className="shrink-0 snap-start">
              <QuizCard variant={quiz.variant as "unlock" | "lock"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
