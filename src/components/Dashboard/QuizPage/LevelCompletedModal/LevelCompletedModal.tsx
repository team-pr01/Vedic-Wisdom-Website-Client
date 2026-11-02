/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import { Link } from "react-router-dom";

type TLevelCompletedModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  quizId: string;
  isLastLevel: boolean;
  nextLevel: any;
};
const LevelCompletedModal: React.FC<TLevelCompletedModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  quizId,
  isLastLevel,
  nextLevel,
}) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center py-3">
        <img src={ICONS.quizCompleted} alt="Success" className="size-40" />
        <h2 className="text-neutral-90 text-2xl font-bold mt-6">
          Level Completed!
        </h2>
        <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
          Congratulations! You have successfully completed this level. You can
          now proceed to next level.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link to={`/dashboard/learn-and-explore/quiz`}>
          <Button
            variant="secondary"
            label="Will Play Later"
            className="px-8"
          /></Link>
          {!isLastLevel && (
            <a href={`/dashboard/quiz/questions/${quizId}?level=${nextLevel}`}>
              <Button label="Continue to Next Level" className="px-8" />
            </a>
          )}
          {isLastLevel && (
            <Link to={`/dashboard/learn-and-explore/quiz`}>
              <Button label="Back to Quizzes" className="px-8" />
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LevelCompletedModal;
