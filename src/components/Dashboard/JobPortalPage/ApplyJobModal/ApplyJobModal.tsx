/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";
import { ICONS, IMAGES } from "../../../../assets";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { useApplyOnJobMutation } from "../../../../redux/Features/Job/jobApplicationApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type TFormData = {
  jobId: string;
  resume: string;
  noteFromApplicant: string;
  termsAccepted: boolean;
};

interface ApplyJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  jobId: string;
}

const ApplyJobModal = ({
  isModalOpen,
  setIsModalOpen,
  jobId,
}: ApplyJobModalProps) => {
  const [applyOnJob, { isLoading, isSuccess }] = useApplyOnJobMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormData>();

  const handleApplyOnJob = async (data: TFormData) => {
    try {
      const payload = {
        jobId,
        resume: data.resume,
        noteFromApplicant: data.noteFromApplicant,
      };

      const response = await applyOnJob(payload).unwrap();
      if (response?.success) {
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to apply on job");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Success Content
  if (isSuccess) {
    return (
      <Modal isModalOpen={isModalOpen} setIsModalOpen={handleClose}>
        <div className="flex flex-col items-center text-center py-3">
          <img src={IMAGES.successTick} alt="Success" className="w-20 h-20" />
          <h2 className="text-neutral-90 text-2xl font-bold mt-6">
            Application Submitted
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
            We have received your application. Stay tuned for further updates.
          </p>
          <Link to="/dashboard/my-applications">
            <Button label="Vew Applications" className="mt-6 px-8" onClick={handleClose} />
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      width="w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[40%] 2xl:w-[30%]"
      isModalOpen={isModalOpen}
      setIsModalOpen={handleClose}
    >
      <div>
        <div className="mb-6">
          <h2 className="text-neutral-90 text-xl font-bold">
            Apply for this Job
          </h2>
          <p className="text-sm text-neutral-60 mt-1">
            Please fill in the details below to submit your application.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleApplyOnJob)} className="space-y-4">
          {/* Resume URL */}
          <TextInput
            label="CV/Resume Link"
            placeholder="Paste google drive or other link"
            error={errors.resume}
            {...register("resume", {
              required: "CV/Resume link is required",
            })}
          />

          <Textarea
            label="Additional Information (Optional)"
            placeholder="Write a short message to the employer..."
            error={errors.noteFromApplicant}
            {...register("noteFromApplicant")}
            isRequired={false}
          />

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 accent-primary-10 cursor-pointer"
              {...register("termsAccepted", {
                required: "You must agree to the terms",
              })}
            />
            <label
              htmlFor="terms"
              className="text-sm text-neutral-60 cursor-pointer"
            >
              I declare that this information is accurate.
            </label>
          </div>
          {errors.termsAccepted && (
            <span className="text-red-500 text-sm -mt-2 block">
              {errors.termsAccepted.message}
            </span>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            label={isLoading ? "Submitting..." : "Submit Application"}
            className="w-full mt-2"
            rightIcon={!isLoading && ICONS.arrowRight}
            isDisabled={isLoading}
            isLoading={isLoading}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ApplyJobModal;
