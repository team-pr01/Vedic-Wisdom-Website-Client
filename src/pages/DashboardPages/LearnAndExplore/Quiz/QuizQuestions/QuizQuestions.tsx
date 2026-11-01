import { useState, useEffect, useMemo } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IMAGES } from "../../../../../assets";
import Button from "../../../../../components/Reusable/Button/Button";
import LevelCompletedModal from "../../../../../components/Dashboard/QuizPage/LevelCompletedModal/LevelCompletedModal";
import QuizCompletedModal from "../../../../../components/Dashboard/QuizPage/QuizCard/QuizCompletedModal/QuizCompletedModal";

type TOption = {
  id: string;
  label: string;
};

type TQuestion = {
  id: string;
  questionText: string;
  options: TOption[];
  correctOptionId: string; // Useful for showing if they got it right later
};

const QuizQuestions = () => {
  const [isLevelCompletedModalOpen, setIsLevelCompletedModalOpen] =
    useState<boolean>(false);
  const [isQuizCompletedModalOpen, setIsQuizCompletedModalOpen] =
    useState<boolean>(false);
  // --- Mock Data (Static Timer, Dynamic Questions) ---
  // In a real app, this comes from the DB and props/API
  const TOTAL_TIME_MINUTES = 30;
  const totalTimeInSeconds = TOTAL_TIME_MINUTES * 60;

  const mockQuestions: TQuestion[] = [
    {
      id: "q1",
      questionText: "Who is considered the author of the Mahabharata?",
      options: [
        { id: "A", label: "Vyasa" },
        { id: "B", label: "Sage" },
        { id: "C", label: "Krishna" },
        { id: "D", label: "Gautama" },
      ],
      correctOptionId: "A",
    },
    {
      id: "q2",
      questionText: "What is the primary language of the ancient Vedas?",
      options: [
        { id: "A", label: "Pali" },
        { id: "B", label: "Sanskrit" },
        { id: "C", label: "Prakrit" },
        { id: "D", label: "Tamil" },
      ],
      correctOptionId: "B",
    },
    {
      id: "q3",
      questionText:
        "Which deity is known as the destroyer in the Hindu trinity?",
      options: [
        { id: "A", label: "Brahma" },
        { id: "B", label: "Vishnu" },
        { id: "C", label: "Shiva" },
        { id: "D", label: "Indra" },
      ],
      correctOptionId: "C",
    },
  ];

  // --- State ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers as a map: { questionId: optionId }
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  // --- Timer Logic ---
  useEffect(() => {
    if (timeLeft <= 0) {
      // Handle timeout (e.g., auto-submit or show modal)
      console.log("Time is up!");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress bar width (percentage)
  const timeProgress = useMemo(() => {
    return (timeLeft / totalTimeInSeconds) * 100;
  }, [timeLeft, totalTimeInSeconds]);

  // --- Handlers ---
  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Handle Submit / Finish
      console.log("Quiz Finished", selectedAnswers);
    }
  };

  return (
    // Center the card on the page
    <div className="font-Manrope min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#FCF9F2] border border-[#F2E8D9] rounded-3xl p-6 md:p-8 shadow-sm">
        {/* --- Question Header --- */}
        <div className="bg-white border border-neutral-55 rounded-2xl px-6 py-8 relative overflow-hidden mb-6">
          {/* Gradient Background from your assets */}
          <img
            src={IMAGES.referBonusGradient}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
          <div className="relative z-10">
            <p className="text-neutral-50 font-medium text-sm md:text-base">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </p>
            <h4 className="text-neutral-90 font-bold text-xl md:text-2xl mt-2 leading-snug">
              {currentQuestion.questionText}
            </h4>
          </div>
        </div>

        {/* --- Timer Section --- */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-neutral-90 font-semibold text-sm">Time</span>

          {/* Progress Bar Container */}
          <div className="flex-1 h-3.5 bg-[#D9D9D9] rounded-full overflow-hidden">
            {/* Animated Progress Bar */}
            <div
              className="h-full bg-[#F5B041] transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${timeProgress}%` }}
            />
          </div>

          <span className="text-neutral-90 font-semibold text-sm w-12 text-right">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* --- Options List --- */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected =
              selectedAnswers[currentQuestion.id] === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-[#F5E6CC] border-primary-10 shadow-sm"
                    : "bg-white border-neutral-55 hover:bg-primary-10/10"
                }`}
              >
                {/* Option Letter */}
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${
                    isSelected ? "text-neutral-90" : "text-neutral-50"
                  }`}
                >
                  {option.id}
                </span>

                {/* Option Text */}
                <span
                  className={`flex-1 text-center font-semibold text-neutral-90`}
                >
                  {option.label}
                </span>

                {/* Check Icon */}
                <FiCheckCircle
                  className={`w-5 h-5 ${
                    isSelected ? "text-primary-10" : "text-neutral-40"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleNext}
          isDisabled={!selectedAnswers[currentQuestion.id]}
          variant="primary"
          label={
            currentQuestionIndex === mockQuestions.length - 1
              ? "Finish"
              : "Next"
          }
          className="w-full px-5 py-4"
        />
      </div>

      <QuizCompletedModal
        isModalOpen={isQuizCompletedModalOpen}
        setIsModalOpen={setIsQuizCompletedModalOpen}
      />
      <LevelCompletedModal
        isModalOpen={isLevelCompletedModalOpen}
        setIsModalOpen={setIsLevelCompletedModalOpen}
      />
    </div>
  );
};

export default QuizQuestions;
