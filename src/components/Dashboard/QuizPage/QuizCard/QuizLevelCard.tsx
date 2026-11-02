/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import ConfirmationModal from "../../../Reusable/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useStartQuizMutation } from "../../../../redux/Features/Quiz/quizApi";
import toast from "react-hot-toast";

const QuizLevelCard = ({
  status,
  level,
  quizId,
  isStarted,
}: {
  status: string;
  level: any;
  quizId: string;
  isStarted?: boolean;
}) => {
  const navigate = useNavigate();
  const [startQuiz, { isLoading }] = useStartQuizMutation();
  const [isPlayQuizConfirmationModalOpen, setIsPlayQuizConfirmationModalOpen] =
    useState<boolean>(false);

  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const handleStartQuiz = async () => {
    if (isLocked || isCompleted) return;

    try {
      const response = await startQuiz(quizId).unwrap();
      if (response?.success) {
        setIsPlayQuizConfirmationModalOpen(false);
        navigate(`/dashboard/quiz/questions/${quizId}?level=${level?.no}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to start quiz");
      setIsPlayQuizConfirmationModalOpen(false);
    }
  };

  // ✅ Handle Button Click
  const handleButtonClick = () => {
    if (isLocked || isCompleted) return;

    if (isStarted) {
      // If already started, bypass the modal and navigate directly
      // We call handleStartQuiz to ensure the backend session is still valid
      handleStartQuiz(); 
    } else {
      // If not started, open the confirmation modal
      setIsPlayQuizConfirmationModalOpen(true);
    }
  };

  // Determine button text
  let buttonText = "Start Quiz";
  if (isLocked) buttonText = "Locked";
  if (isCompleted) buttonText = "Completed";
  if (!isLocked && !isCompleted && isStarted) buttonText = "Continue";

  return (
    <div
      className={`${isLocked ? "bg-neutral-70" : "bg-white"} p-4 border border-primary-80 rounded-xl w-63`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl">
          Level - {level?.no}
        </h4>
        
        {/* Icon Logic */}
        <div
          className={`${
            isLocked ? "bg-gradient-primary-button" : 
            isCompleted ? "bg-green-500" : "bg-white"
          } border border-primary-80 size-8 rounded-full shadow-quiz-lock flex items-center justify-center`}
        >
          {isCompleted ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <img
              src={isLocked ? ICONS.lockWhite : ICONS.unlockPrimary}
              alt=""
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-3 text-sm text-neutral-90">
        <div className="flex flex-col items-center text-center">
          <p>Questions</p>
          <p>{level?.questions?.length || 0}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <p>Duration</p>
          <p>{level?.duration}mins</p>
        </div>
      </div>

      <Button
        label={isLoading ? "Loading..." : buttonText}
        variant="secondary"
        className={`w-full border border-primary-84 ${
          (isLocked || isCompleted) ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleButtonClick}
        isDisabled={isLocked || isCompleted || isLoading}
      />

      <ConfirmationModal
        isModalOpen={isPlayQuizConfirmationModalOpen}
        setIsModalOpen={setIsPlayQuizConfirmationModalOpen}
        title="Play Quiz"
        description="Are you sure you want to play this quiz?"
        variant="primary"
        confirmButtonText="Yes, Start"
        onConfirm={handleStartQuiz}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuizLevelCard;