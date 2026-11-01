/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { IMAGES } from "../../../../../assets";
import Button from "../../../../../components/Reusable/Button/Button";
import LevelCompletedModal from "../../../../../components/Dashboard/QuizPage/LevelCompletedModal/LevelCompletedModal";
import QuizCompletedModal from "../../../../../components/Dashboard/QuizPage/QuizCard/QuizCompletedModal/QuizCompletedModal";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useGetQuizQuestionsByLevelNoQuery,
  useSubmitLevelAnswersMutation,
} from "../../../../../redux/Features/Quiz/quizApi";
import toast from "react-hot-toast";

const QuizQuestions = () => {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");

  const [isLevelCompletedModalOpen, setIsLevelCompletedModalOpen] =
    useState<boolean>(false);
  const [isQuizCompletedModalOpen, setIsQuizCompletedModalOpen] =
    useState<boolean>(false);

  const [submitLevelAnswers, { isLoading: isSubmitting }] =
    useSubmitLevelAnswersMutation();

  const { data: quizQuestionsData, isLoading } =
    useGetQuizQuestionsByLevelNoQuery({
      quizId: quizId || "",
      levelNo: level || "",
    });

  const data = quizQuestionsData?.data || {};
  const questions = data?.questions || [];
  const TOTAL_TIME_MINUTES = data?.duration || 0;
  const totalTimeInSeconds = TOTAL_TIME_MINUTES * 60;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Store answers as { questionId: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});

  const [timeLeft, setTimeLeft] = useState(0);

  // --- Sync Timer with API Data ---
  useEffect(() => {
    if (totalTimeInSeconds > 0) {
      setTimeLeft(totalTimeInSeconds);
    }
  }, [totalTimeInSeconds]);

  const currentQuestion = questions[currentQuestionIndex];

  // --- Timer Logic ---
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timeProgress = useMemo(() => {
    if (totalTimeInSeconds === 0) return 0;
    return (timeLeft / totalTimeInSeconds) * 100;
  }, [timeLeft, totalTimeInSeconds]);

  const timerColor = timeLeft < 300 ? "#EF4444" : "#F5B041";

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeProgress / 100) * circumference;

  // --- Handlers ---
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = async () => {
    // If there are more questions, go to next
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // --- SUBMIT QUIZ ---
      try {
        // Format answers to match the expected payload exactly
        const formattedAnswers = questions.map((q: any, index: number) => {
          const selectedOpt = selectedAnswers[q._id];
          return {
            questionIndex: index,
            // If they skipped a question, default to -1 (or you can use 0).
            // Assuming the button is disabled until they select, this should always be a number.
            selectedOption: selectedOpt !== undefined ? selectedOpt : -1,
          };
        });

        const timeTaken = totalTimeInSeconds - timeLeft;

        const payload = {
          answers: formattedAnswers,
          timeTaken: timeTaken,
        };

        console.log("Submitting Payload:", payload);

        // Call API with query params
        const response = await submitLevelAnswers({
          quizId: quizId || "",
          levelNo: level || "",
          data: payload,
        }).unwrap();

        // Handle success
        if (response?.success) {
          toast.success("Quiz submitted successfully!");
          setIsLevelCompletedModalOpen(true);
          // Optional: You can use response.data to determine if they passed (LevelCompletedModal) vs failed
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to submit quiz");
        console.error(error);
      }
    }
  };

  // Loading State (Prevents crashing on first render)
  if (isLoading || !currentQuestion) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentSelectedOption = selectedAnswers[currentQuestion._id];

  return (
    <div className="font-Manrope min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#FCF9F2] border border-[#F2E8D9] rounded-3xl p-6 md:p-8 shadow-sm relative">
        {/* --- Floating Timer Widget --- */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-[#F2E8D9] px-5 py-2.5 rounded-full flex items-center gap-3 z-20">
          <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="transform -rotate-90 w-12 h-12">
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="4"
                fill="transparent"
              />
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
            <FiClock className="absolute text-neutral-50" size={16} />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-xs text-neutral-50 font-semibold uppercase tracking-wider">
              Time Left
            </span>
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
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <h4 className="text-neutral-90 font-bold text-xl md:text-2xl mt-2 leading-snug">
              {currentQuestion?.question}
            </h4>
          </div>
        </div>

        {/* --- Options List --- */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option: string, index: number) => {
            const isSelected = currentSelectedOption === index;

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(currentQuestion._id, index)}
                className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-[#F5E6CC] border-primary-10 shadow-sm"
                    : "bg-white border-neutral-55 hover:bg-primary-10/10"
                }`}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${isSelected ? "text-neutral-90" : "text-neutral-50"}`}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="flex-1 text-center font-semibold text-neutral-90">
                  {option}
                </span>

                <FiCheckCircle
                  className={`w-5 h-5 ${isSelected ? "text-primary-10" : "text-neutral-40"}`}
                />
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleNext}
          isDisabled={currentSelectedOption === undefined || isSubmitting}
          isLoading={isSubmitting}
          variant="primary"
          label={
            isSubmitting
              ? "Submitting..."
              : currentQuestionIndex === questions.length - 1
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
        quizId={quizId || ""}
        nextLevel={level && level + 1}
      />
    </div>
  );
};

export default QuizQuestions;
