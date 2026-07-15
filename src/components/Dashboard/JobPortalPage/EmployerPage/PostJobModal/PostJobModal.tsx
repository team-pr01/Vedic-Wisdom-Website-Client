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
  tradeLicense: File | null;
}

export interface JobDetails {
  jobTitle: string;
  paidType: "paid" | "unpaid";
  jobType: string;
  mode: string;
  country: string;
  area: string;
  educationLevel: string;
  minSalary: string;
  maxSalary: string;
  experienceLevel: string;
  jobDescription: string;
  requiredSkills: string;
  applicationDeadline: string;
  vacancies: string;
  requiredCertifications: string;
  termsAccepted: boolean;
}

export type FormData = CompanyInfo & JobDetails;

const PostJobModal = ({ isModalOpen, setIsModalOpen }: PostJobModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hiringType, setHiringType] = useState<"company" | "individual">(
    "company",
  );

  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [tradeLicense, setTradeLicense] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
    setValue,
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

  const totalSteps = 3;

  const steps = [
    { number: 1, label: "Company Info" },
    { number: 2, label: "Job Details" },
  ];

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "companyName",
          "companyAddress",
          "contactNumber",
          "officialEmail",
        ]);
        break;
      case 2:
        isValid = await trigger([
          "jobTitle",
          "paidType",
          "jobType",
          "mode",
          "country",
          "area",
          "minSalary",
          "maxSalary",
          "experienceLevel",
          "jobDescription",
          "requiredSkills",
          "applicationDeadline",
          "vacancies",
          "termsAccepted",
        ]);
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", { ...data, tradeLicense });
      setIsSubmitting(false);
      setCurrentStep(3);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
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
            hiringType={hiringType}
            setHiringType={setHiringType}
            tradeLicense={tradeLicense}
            setTradeLicense={setTradeLicense}
            handleFileUpload={(e) => {
              if (e.target.files && e.target.files[0]) {
                setTradeLicense(e.target.files[0]);
              }
            }}
            removeFile={() => setTradeLicense(null)}
          />
        );
      case 2:
        return (
          <JobDetailsStep
            register={register}
            errors={errors}
            watch={watch}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
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
      setIsModalOpen={setIsModalOpen}
    >
      <div>
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
          {currentStep !== 3 && (
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-20">
              <Button
                type="button"
                label="Previous"
                variant="secondary"
                onClick={prevStep}
                className={`px-6 ${currentStep === 1 ? "invisible" : ""}`}
              />
              <Button
                type={currentStep === 2 ? "submit" : "button"}
                label={currentStep === 2 ? "Submit Job" : "Next"}
                className="px-6"
                onClick={currentStep === 1 ? nextStep : undefined}
                rightIcon={ICONS.arrowRight}
                isDisabled={isSubmitting}
              />
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default PostJobModal;
