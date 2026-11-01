import QuizCard from "../QuizCard/QuizCard";

const QuizList = () => {
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
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h3 className="text-neutral-90 font-bold text-2xl">Jnanarthi</h3>

        {/* Prize Money Badge */}
        <div className="flex items-center gap-2 bg-[#FCF9F2] border border-[#F2E8D9] px-4 py-2 rounded-full shadow-sm w-fit">
          <span className="text-xl">🏆</span>
          <span className="text-sm font-semibold text-neutral-50">
            Prize Pool:
          </span>
          <span className="text-lg font-bold text-[#F0B741]">$500</span>
        </div>
      </div>

      {/* Quiz Cards Carousel */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
        {quizData.map((quiz) => (
          <div key={quiz.id} className="shrink-0 snap-start">
            <QuizCard variant={quiz.variant as "unlock" | "lock"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
