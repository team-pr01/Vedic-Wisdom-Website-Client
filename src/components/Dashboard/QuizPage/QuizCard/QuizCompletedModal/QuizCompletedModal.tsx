import React from "react";
import Modal from "../../../../Reusable/Modal/Modal";
import { ICONS } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";
import { Link } from "react-router-dom";

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
          <Link to="/dashboard" className="w-full sm:w-1/2">
            <Button variant="secondary" label="Back to Dashboard" className="w-full" />
          </Link>

          {/* Primary Action */}
          <Link to="/dashboard/quiz/results" className="w-full sm:w-1/2">
            <Button label="View Result" className="w-full" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default QuizCompletedModal;
