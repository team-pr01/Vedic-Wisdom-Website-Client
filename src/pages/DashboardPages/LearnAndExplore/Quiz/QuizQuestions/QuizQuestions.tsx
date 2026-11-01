import { useState, useEffect, useMemo } from "react";
import { FiCheckCircle, FiClock } from "react-icons/fi";
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
  correctOptionId: string;
};

const QuizQuestions = () => {
  const [isLevelCompletedModalOpen, setIsLevelCompletedModalOpen] = useState<boolean>(false);
  const [isQuizCompletedModalOpen, setIsQuizCompletedModalOpen] = useState<boolean>(false);
  
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
      questionText: "Which deity is known as the destroyer in the Hindu trinity?",
      options: [
        { id: "A", label: "Brahma" },
        { id: "B", label: "Vishnu" },
        { id: "C", label: "Shiva" },
        { id: "D", label: "Indra" },
      ],
      correctOptionId: "C",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  // --- Timer Logic ---
  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("Time is up!");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate percentage for the circular ring
  const timeProgress = useMemo(() => {
    return (timeLeft / totalTimeInSeconds) * 100;
  }, [timeLeft, totalTimeInSeconds]);

  // Determine color based on time left (Turns red when < 5 mins / 300 seconds)
  const timerColor = timeLeft < 300 ? "#EF4444" : "#F5B041"; 

  // SVG Circle Calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeProgress / 100) * circumference;

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
      console.log("Quiz Finished", selectedAnswers);
      setIsQuizCompletedModalOpen(true);
    }
  };

  return (
    <div className="font-Manrope min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#FCF9F2] border border-[#F2E8D9] rounded-3xl p-6 md:p-8 shadow-sm relative">
        
        {/* --- Floating Timer Widget --- */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-[#F2E8D9] px-5 py-2.5 rounded-full flex items-center gap-3 z-20">
          <div className="relative flex items-center justify-center w-12 h-12">
            {/* SVG Ring */}
            <svg className="transform -rotate-90 w-12 h-12">
              {/* Background Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="4"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke={timerColor}
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            {/* Clock Icon inside Ring */}
            <FiClock className="absolute text-neutral-50" size={16} />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-xs text-neutral-50 font-semibold uppercase tracking-wider">Time Left</span>
            <span 
              className="text-lg font-bold leading-none" 
              style={{ color: timerColor }}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* --- Question Header --- */}
        <div className="bg-white border border-neutral-55 rounded-2xl px-6 py-8 relative overflow-hidden mb-8 mt-4">
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

        {/* --- Options List --- */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;

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
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${
                    isSelected ? "text-neutral-90" : "text-neutral-50"
                  }`}
                >
                  {option.id}
                </span>

                <span className="flex-1 text-center font-semibold text-neutral-90">
                  {option.label}
                </span>

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
          label={currentQuestionIndex === mockQuestions.length - 1 ? "Finish" : "Next"}
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