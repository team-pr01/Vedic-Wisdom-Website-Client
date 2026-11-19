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
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

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

  const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 250, duration: 0.4 },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { type: "spring", damping: 20, stiffness: 250, duration: 0.3 },
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
          className="fixed inset-0 z-1000 bg-black/60 h-full backdrop-blur-sm flex items-end sm:items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => closeOnBackdropClick && setIsModalOpen(false)}
        >
          <motion.div
            className="w-full sm:w-[90%] md:w-[85%] lg:w-[90%] xl:w-[75%] 2xl:w-[60%] h-h-dvh sm:h-[90vh] lg:h-[75vh] overflow-y-auto bg-white rounded-none md:rounded-t-2xl sm:rounded-2xl shadow-2xl relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-rounded-radial absolute -top-20 -left-28 w-45 h-35 rounded-none md:rounded-full blur-[80px]" />
            <div className="bg-gradient-rounded-radial absolute right-0 -top-18 w-45 h-35 rounded-none md:rounded-full blur-[80px]" />

            <button
              className="absolute top-3 right-3 z-20 size-8 flex items-center justify-center rounded-none md:rounded-full bg-white border border-neutral-55 hover:bg-gray-100 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross1 className="cursor-pointer text-gray-500 hover:text-gray-700" />
            </button>

            {/* Stacked on mobile/tablet, side-by-side on lg+ */}
            <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 relative h-full">
              {/* Left side — image/consultant info */}
              <div className="bg-gradient-book-consultation-modal px-5 sm:px-8 lg:px-16 py-6 lg:py-10 flex flex-col justify-between w-full lg:w-[60%] lg:h-full rounded-none md:rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                <img
                  src={IMAGES.logo}
                  alt="Logo"
                  className="mx-auto lg:mx-0 w-28 sm:w-32 lg:w-40"
                />

                <div className="w-40 h-40 sm:w-52 sm:h-52 lg:size-75 mx-auto rounded-full relative my-5 lg:my-0">
                  <img
                    src={consultant?.imageUrl}
                    alt=""
                    className="size-full rounded-full object-cover"
                  />

                  <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-20/80 absolute -left-10 lg:left-0 bottom-10 sm:bottom-16 min-w-14 sm:min-w-16">
                    <h2 className="text-neutral-90 font-bold text-xs sm:text-base">
                      {consultant?.fees}
                    </h2>
                    <p className="text-neutral-50 font-medium text-[10px] sm:text-xs mt-px">
                      Per hr
                    </p>
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-20/80 absolute right-0 top-2 sm:top-3">
                    <h2 className="text-neutral-90 font-bold text-xs sm:text-base">
                      {consultant?.experience}
                    </h2>
                    <p className="text-neutral-50 font-medium text-[10px] sm:text-xs mt-px">
                      Experience
                    </p>
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-20/80 absolute -right-10 lg:right-0 bottom-2 sm:bottom-3">
                    <h2 className="text-neutral-90 font-bold text-xs sm:text-base">
                      {consultant?.name}
                    </h2>
                    <p className="text-neutral-50 font-medium text-[10px] sm:text-xs mt-px capitalize">
                      {consultant?.category} Expert
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-50 font-medium mt-2 text-center px-2">
                  You're just one step away from scheduling your Jyotish
                  consultation. Please review your appointment details and
                  confirm your booking to reserve your preferred time slot.
                </p>
              </div>

              {/* Right side — form */}
              <div className="flex flex-col justify-between text-center p-5 sm:p-6 lg:p-6 gap-5 lg:gap-0 lg:h-[80%] w-full lg:w-[40%] lg:mt-0">
                <div>
                  <h2 className="text-neutral-90 text-xl sm:text-2xl font-bold">
                    Book Consultation
                  </h2>
                  <p className="text-sm text-neutral-50 font-medium mt-2">
                    Connect with our trusted consultants for personalized
                    guidance and expert advice.
                  </p>
                </div>

                <div>
                  <h3 className="text-neutral-90 text-lg sm:text-xl font-semibold text-left">
                    Why Book With Us?
                  </h3>

                  <div className="space-y-2 mt-3 sm:mt-4 text-left">
                    {whyUs?.map((item) => (
                      <div key={item} className="flex items-center gap-1">
                        <img src={ICONS.checkMark} alt="" className="shrink-0" />
                        <p className="text-xs sm:text-sm text-neutral-50 font-medium">
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