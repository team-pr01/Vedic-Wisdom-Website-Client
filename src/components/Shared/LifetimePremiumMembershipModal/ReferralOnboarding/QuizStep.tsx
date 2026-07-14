import { useState } from "react";

const QuizStep = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const quizQuestions = [
    {
      id: 1,
      question: "Who is considered the author of the Mahabharata?",
      options: ["Virya", "Suga", "Kshatriya", "Ved Vyasa"],
      correct: "Ved Vyasa",
    },
    {
      id: 2,
      question: "How many books are there in the Mahabharata?",
      options: ["18", "12", "16", "15"],
      correct: "18",
    },
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-90">Quiz</h3>
          <p className="text-sm text-neutral-60 mt-0.5">
            Answer these questions to proceed
          </p>
        </div>
        <span className="text-xs font-medium text-primary-10 bg-primary-10/10 px-3 py-1 rounded-full">
          Step 1 of 4
        </span>
      </div>

      {/* Quiz Questions */}
      <div className="space-y-4">
        {quizQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-neutral-20 rounded-xl p-4"
          >
            <p className="text-sm font-medium text-neutral-90 mb-3">
              {q.id}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all duration-300 text-sm ${
                    selectedAnswer === option
                      ? "border-primary-10 bg-primary-10/10 text-primary-10"
                      : "border-neutral-20 hover:border-primary-10 hover:bg-primary-10/5"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizStep;
