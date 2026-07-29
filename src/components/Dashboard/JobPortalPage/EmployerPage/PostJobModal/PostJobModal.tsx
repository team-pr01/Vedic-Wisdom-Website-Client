/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../../Reusable/Modal/Modal";
import Button from "../../../../Reusable/Button/Button";
import { ICONS } from "../../../../../assets";
import CompanyInfoStep from "./CompanyInfoStep/CompanyInfoStep";
import JobDetailsStep from "./JobDetailsStep/JobDetailsStep";
import SuccessStep from "./SuccessStep/SuccessStep";

interface PostJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CompanyInfo {
  hiringType: "company" | "individual";
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  officialEmail: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  companyLogo: File | null;
}

export interface JobDetails {
  jobTitle: string;
  paidType: "paid" | "unpaid";
  jobType: string;
  mode: string;
  country: string;
  state: string;
  city: string;
  area: string;
  educationLevel: string;
  minSalary: string;
  maxSalary: string;
  experienceLevel: string;
  jobDescription: string;
  requiredSkills: string;
  applicationDeadline: string;
  vacancies: string;
  termsAccepted: boolean;
}

export type FormData = CompanyInfo & JobDetails;

const PostJobModal = ({ isModalOpen, setIsModalOpen }: PostJobModalProps) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      hiringType: "company",
      paidType: "paid",
      jobType: "",
      mode: "",
      educationLevel: "",
      experienceLevel: "",
      termsAccepted: false,
    },
  });

  const totalSteps = 2;

  const steps = [
    { number: 1, label: "Company Info" },
    { number: 2, label: "Job Details" },
  ];

  // Validate current step before proceeding
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger([
          "companyName",
          "companyAddress",
          "contactNumber",
          "officialEmail",
        ]);
      case 2:
        return await trigger([
          "jobTitle",
          "paidType",
          "jobType",
          "mode",
          "minSalary",
          "maxSalary",
          "experienceLevel",
          "jobDescription",
          "requiredSkills",
          "applicationDeadline",
          "vacancies",
          "termsAccepted",
        ]);
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Data:", { ...data, companyLogo });
      setIsSubmitted(true);
      reset();
      setCompanyLogo(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
    }, 300);
  };

  // Success Content
  if (isSubmitted) {
    return (
      <Modal isModalOpen={isModalOpen} setIsModalOpen={handleClose}>
        <SuccessStep />
      </Modal>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInfoStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            companyLogo={companyLogo}
            setCompanyLogo={setCompanyLogo}
            handleFileUpload={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCompanyLogo(e.target.files[0]);
              }
            }}
            removeFile={() => setCompanyLogo(null)}
          />
        );
      case 2:
        return (
          <JobDetailsStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            setCountry={setCountry}
            setState={setState}
            setCity={setCity}
            country={country}
            state={state}
            city={city}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      width="w-[90%] lg:w-[80%] xl:w-[60%] 2xl:w-[40%]"
      isModalOpen={isModalOpen}
      setIsModalOpen={handleClose}
    >
      <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-5 mt-7 mb-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep >= step.number
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-30 text-neutral-60"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    currentStep >= step.number
                      ? "text-primary-10"
                      : "text-neutral-60"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-15 h-0.5 mx-1 ${
                    currentStep > step.number
                      ? "bg-primary-10"
                      : "bg-neutral-55"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-20">
            <Button
              type="button"
              label="Previous"
              variant="secondary"
              onClick={handlePrevStep}
              className={`px-6 ${currentStep === 1 ? "invisible" : ""}`}
              leftIcon={ICONS.arrowLeft}
            />
            <div className="flex gap-3">
              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  label={isSubmitting ? "Submitting..." : "Submit Job"}
                  className="px-8"
                  rightIcon={!isSubmitting && ICONS.arrowRight}
                  isDisabled={isSubmitting}
                />
              ) : (
                <Button
                  type="button"
                  label="Next"
                  className="px-8"
                  onClick={handleNextStep}
                  rightIcon={ICONS.arrowRight}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PostJobModal;
