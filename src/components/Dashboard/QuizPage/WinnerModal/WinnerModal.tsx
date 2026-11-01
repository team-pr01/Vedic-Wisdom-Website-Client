import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";

type TWinnerModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rewardAmount?: string;
  onGetCoins?: () => void;
  onReceivePayment?: () => void;
};

const WinnerModal = ({
  isModalOpen,
  setIsModalOpen,
  rewardAmount = "$20 Prize",
  onGetCoins,
  onReceivePayment,
}: TWinnerModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      width="w-[90%] max-w-md" // Adjust based on your Modal component's props
    >
      {/* Relative container with background gradient */}
      <div className="relative font-Manrope flex flex-col items-center text-center">
        
        {/* --- Background Decorative Gradient & Dots --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Top golden glow */}
          <div className="absolute -top-20 -left-10 w-64 h-64 bg-[#FDE8A5] rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute -top-10 right-0 w-48 h-48 bg-[#F5B041] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          {/* Little decorative dots (mimicking confetti) */}
          <div className="absolute top-12 left-12 w-3 h-3 bg-[#D8A238] rounded-full opacity-60"></div>
          <div className="absolute top-20 left-24 w-1.5 h-1.5 bg-[#F5B041] rounded-full opacity-80"></div>
          <div className="absolute top-16 right-16 w-2 h-2 bg-[#D8A238] rounded-full opacity-70"></div>
          <div className="absolute top-32 right-12 w-1.5 h-1.5 bg-[#F5B041] rounded-full opacity-50"></div>
          <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-[#D8A238] rounded-full opacity-40"></div>
        </div>

        {/* --- Content --- */}
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Trophy Icon Circle */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-[#E8B746] rounded-full flex items-center justify-center shadow-lg shadow-[#E8B746]/40 mb-6"
          >
            <FaTrophy className="text-white text-4xl" />
          </motion.div>

          {/* Text */}
          <h2 className="text-[28px] font-bold text-neutral-90 mb-2">
            Congratulations
          </h2>
          <p className="text-neutral-50 text-sm mb-8">
            You are one of the winners of this quiz.
          </p>

          {/* Reward Box */}
          <div className="w-full bg-[#FCF9F2] border border-[#F2E8D9] rounded-xl py-5 mb-6 shadow-sm">
            <p className="text-neutral-90 font-semibold text-sm mb-1">
              Your Reward
            </p>
            <p className="text-2xl font-bold text-neutral-90">
              {rewardAmount}
            </p>
          </div>

          <p className="text-neutral-50 text-xs mb-8">
            You can choose how you want to <br /> receive your reward.
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Button
              label="Get Coins"
              variant="primary"
              className="w-full py-3.5 text-base font-bold bg-[#F0B741] hover:bg-[#dca52d] border-none shadow-md"
              onClick={onGetCoins}
            />
            
            <button
              onClick={onReceivePayment}
              className="w-full py-3.5 text-base font-bold text-neutral-90 bg-white border-2 border-[#F0B741] rounded-lg hover:bg-[#FCF9F2] transition-colors"
            >
              Receive Payment
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;