import { IMAGES } from "../../../../../assets";
import Modal from "../../../../Reusable/Modal/Modal";

type TPaymentRequestModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentRequestModal = ({
  isModalOpen,
  setIsModalOpen,
}: TPaymentRequestModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      width="w-[90%] max-w-sm"
    >
      <div className="relative font-Manrope flex flex-col items-center text-center">
        {/* --- Background Decorative Gradient & Dots --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-64 h-64 bg-[#FDE8A5] rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute -top-10 right-0 w-48 h-48 bg-[#F5B041] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        {/* --- Content --- */}
        <div className="relative z-10 w-full flex flex-col items-center pt-4">
          <img src={IMAGES.successTick} alt="Success" className="size-40" />

          {/* Text */}
          <h2 className="text-2xl font-bold text-[#1A1A3D] mb-3 leading-tight mt-6">
            Payment Request <br /> Submitted
          </h2>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-8 px-2">
            Admin will review your details and send the reward shortly.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentRequestModal;
