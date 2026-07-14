import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import QuizStep from "./QuizStep";
import VideoSummaryStep from "./VideoSummaryStep";
import ReferralCodeStep from "./ReferralCodeStep";
import GetDiscountStep from "./GetDiscountStep";

const ReferralOnboarding = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 4;

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Check if all questions are answered
      //   setQuizCompleted(true);
    }
    if (currentStep === totalSteps) {
      setIsModalOpen(false);
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="font-Manrope p-2 mt-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep ? "bg-primary-10" : "bg-neutral-20"
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 ? (
        <QuizStep />
      ) : currentStep === 2 ? (
        <VideoSummaryStep />
      ) : currentStep === 3 ? (
        <ReferralCodeStep />
      ) : (
        <GetDiscountStep />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <Button
          type="button"
          label="Previous"
          variant="secondary"
          onClick={handlePrevStep}
          className={`${currentStep === 1 ? "disabled" : ""}`}
        />
        <Button
          type="button"
          label={currentStep === totalSteps ? "Close" : "Continue"}
          onClick={handleNextStep}
          rightIcon={currentStep === totalSteps ? null : ICONS.arrowRight}
        />
      </div>
    </div>
  );
};

export default ReferralOnboarding;
