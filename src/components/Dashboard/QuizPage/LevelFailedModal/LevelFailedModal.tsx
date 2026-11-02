import type { Dispatch, SetStateAction } from "react";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

type TLevelFailedModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  score: number;
  passingScore: number;
  retryUrl: string; 
};

const LevelFailedModal: React.FC<TLevelFailedModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  score,
  passingScore,
  retryUrl,
}) => {
  const handleRetry = () => {
    setIsModalOpen(false);
    // Force a full page refresh and append retry=true so the modal doesn't reopen
    window.location.href = `${retryUrl}&retry=true`;
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center py-3">
        <div className="w-40 h-40 flex items-center justify-center bg-red-50 rounded-full mb-2">
           <FaTimesCircle className="text-red-500 text-8xl" />
        </div>
        
        <h2 className="text-neutral-90 text-2xl font-bold mt-6">
          Level Failed!
        </h2>
        
        <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
          Don't worry, practice makes perfect! You didn't reach the passing score for this level. Review the material and try again.
        </p>

        <div className="mt-5 bg-[#FCF9F2] border border-[#F2E8D9] px-8 py-3 rounded-2xl flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-50 font-semibold uppercase">Your Score</span>
            <span className="text-2xl font-bold text-red-500">{score}</span>
          </div>
          <div className="w-px h-8 bg-neutral-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-50 font-semibold uppercase">Required</span>
            <span className="text-2xl font-bold text-neutral-90">{passingScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Link to={`/dashboard/learn-and-explore/quiz`}>
            <Button variant="secondary" label="Back to Quizzes" className="px-6" />
          </Link>
          
          <Button 
            label="Try Again" 
            className="px-8 bg-red-500 hover:bg-red-600 border-none text-white shadow-md shadow-red-500/20" 
            onClick={handleRetry}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LevelFailedModal;