/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import ConfirmationModal from "../../../Reusable/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useStartQuizMutation } from "../../../../redux/Features/Quiz/quizApi";
import toast from "react-hot-toast";

const QuizLevelCard = ({
  variant,
  level,
  quizId,
}: {
  variant: string;
  level: any;
  quizId: string;
}) => {
  const navigate = useNavigate();
  const [startQuiz, { isLoading }] = useStartQuizMutation();
  const [isPlayQuizConfirmationModalOpen, setIsPlayQuizConfirmationModalOpen] =
    useState<boolean>(false);

  const handleStartQuiz = async () => {
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

  return (
    <div
      className={`${variant === "lock" ? "bg-neutral-70" : "bg-white"} p-4 border border-primary-80 rounded-xl w-63`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl">
          Level - {level?.no}
        </h4>
        <div
          className={`${variant === "lock" ? "bg-gradient-primary-button" : "bg-white"} border border-primary-80 size-8 rounded-full shadow-quiz-lock flex items-center justify-center`}
        >
          <img
            src={variant === "lock" ? ICONS.lockWhite : ICONS.unlockPrimary}
            alt=""
          />
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
        label="Start Quiz"
        variant="secondary"
        className="w-full border border-primary-84"
        onClick={() => setIsPlayQuizConfirmationModalOpen(true)}
        // isDisabled={variant === "lock"}
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
