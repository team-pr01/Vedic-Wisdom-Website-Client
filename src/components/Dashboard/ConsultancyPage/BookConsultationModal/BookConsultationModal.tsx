/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { ICONS, IMAGES } from "../../../../assets";
import { useForm } from "react-hook-form";
import type { TConsultant } from "../../../../types/consultants.type";
import { useBookConsultationMutation } from "../../../../redux/Features/Consultation/consultationApi";
import toast from "react-hot-toast";

type TFormData = {
  concern: string;
};

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  consultant: TConsultant;
};

const BookConsultationModal: React.FC<TModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  consultant,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when modal is open
    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen, closeOnEsc, setIsModalOpen]);

  // Animation variants for slide from bottom to center
  const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants: any = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 250,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 250,
        duration: 0.3,
      },
    },
  };

  const [bookConsultation, { isLoading }] = useBookConsultationMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormData>();

  const handleBookConsultation = async (data: TFormData) => {
    try {
      const payload = {
        consultantId: consultant._id,
        concern: data.concern,
      };

      const response = await bookConsultation(payload).unwrap();

      if (response?.success) {
        reset();
        setIsModalOpen(false);
        toast.success(
          "Your consultation booked successfully! We will contact you soon.",
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const whyUs = [
    "100%  private & Confidential",
    "Verified & Experienced Experts",
    "Personalized Guidance",
    "Multiple Consultation Options",
    "Easy Reschedule & Support",
  ];
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-1000 bg-black/60 h-full backdrop-blur-sm flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => closeOnBackdropClick && setIsModalOpen(false)}
        >
          <motion.div
            className={`w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[60%] 2xl:w-[60%] h-[75vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-rounded-radial absolute -top-20 -left-28 w-45 h-35 rounded-full blur-[80px]"></div>
            <div className="bg-gradient-rounded-radial absolute right-0 -top-18 w-45 h-35 rounded-full blur-[80px]"></div>
            <button
              className="absolute top-3 right-3 z-10 size-8 flex items-center justify-center rounded-full bg-white border border-neutral-55 hover:bg-gray-100 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross1 className="cursor-pointer text-gray-500 hover:text-gray-700" />
            </button>

            <div className="flex items-center gap-8 relative h-full">
              {/* Left side */}
              <div className="bg-gradient-book-consultation-modal px-16 py-10 flex flex-col justify-between w-[60%] h-full rounded-l-2xl">
                <img src={IMAGES.logo} alt="Logo" className="mx-0 w-40" />

                <div className="size-75 mx-auto rounded-full relative">
                  <img
                    src={consultant?.imageUrl}
                    alt=""
                    className="size-full rounded-full"
                  />

                  <div className="p-2 rounded-lg bg-neutral-20/80 absolute left-0 bottom-16 min-w-16">
                    <h2 className="text-neutral-90 font-bold">
                      {consultant?.fees}
                    </h2>
                    <p className="text-neutral-50 font-medium text-xs mt-px">
                      Per hr
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-20/80 absolute right-0 top-3">
                    <h2 className="text-neutral-90 font-bold">
                      {consultant?.experience}
                    </h2>
                    <p className="text-neutral-50 font-medium text-xs mt-px">
                      Experience
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-20/80 absolute right-0 bottom-3">
                    <h2 className="text-neutral-90 font-bold">
                      {consultant?.name}
                    </h2>
                    <p className="text-neutral-50 font-medium text-xs mt-px capitalize">
                      {consultant?.category} Expert
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-50 font-medium mt-2 text-center">
                  You're just one step away from scheduling your Jyotish
                  consultation. Please review your appointment details and
                  confirm your booking to reserve your preferred time slot.
                </p>
              </div>

              {/* Right side */}
              <div className="flex flex-col justify-between text-center p-6 h-[80%] w-[40%]">
                <div>
                  <h2 className="text-neutral-90 text-2xl font-bold">
                    Book Consultation
                  </h2>
                  <p className="text-sm text-neutral-50 font-medium mt-2">
                    Connect with our trusted consultants for personalized
                    guidance and expert advice.
                  </p>
                </div>

                <div>
                  <h3 className="text-neutral-90 text-xl font-semibold text-left">
                    Why Book With Us?
                  </h3>

                  <div className="space-y-2 mt-4 text-left">
                    {whyUs?.map((item) => (
                      <div className="flex items-center gap-1">
                        <img src={ICONS.checkMark} alt="" />
                        <p className="text-sm text-neutral-50 font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(handleBookConsultation)}
                  className="space-y-4 w-full"
                >
                  <Textarea
                    placeholder="Please describe your concern in brief....."
                    error={errors.concern}
                    {...register("concern", {
                      required: "This field is required",
                    })}
                  />
                  <Button
                    type="submit"
                    label="Book Consultation"
                    rightIcon={ICONS.arrowRight}
                    className="w-full"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookConsultationModal;
