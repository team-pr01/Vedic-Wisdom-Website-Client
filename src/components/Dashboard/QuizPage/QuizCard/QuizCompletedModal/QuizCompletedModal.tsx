import React from "react";
import Modal from "../../../../Reusable/Modal/Modal";
import { ICONS } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";

type TQuizCompletedModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  score?: number;
  totalQuestions?: number;
  onViewResults?: () => void;
  onBackToDashboard?: () => void;
};

const QuizCompletedModal: React.FC<TQuizCompletedModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center py-3">
        <img src={ICONS.quizCompleted} alt="Success" className="size-40" />

        <h2 className="text-neutral-90 text-2xl font-bold mt-6">
          Quiz Completed!
        </h2>

        <p className="text-sm text-neutral-50 font-medium mt-4 max-w-sm">
          Congratulations! You have successfully completed this quiz.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full max-w-md">
          {/* Secondary Action */}
          <Button
            variant="secondary"
            label="Back to Dashboard"
            className="w-full sm:w-1/2"
          />

          {/* Primary Action */}
          <Button label="View Leaderboard" className="w-full sm:w-1/2" />
        </div>
      </div>
    </Modal>
  );
};

export default QuizCompletedModal;
