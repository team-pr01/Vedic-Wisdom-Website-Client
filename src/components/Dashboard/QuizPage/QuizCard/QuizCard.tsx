import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const QuizCard = ({variant} : {variant: string}) => {
  return (
    <div className={`${variant==="lock" ? "bg-neutral-70" : "bg-white"} p-4 border border-primary-80 rounded-xl w-63`}>
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl">Level - 01</h4>
        <div className={`${variant==="lock" ? "bg-gradient-primary-button" : "bg-white"} border border-primary-80 size-8 rounded-full shadow-quiz-lock flex items-center justify-center`}>
          <img src={variant==="lock" ? ICONS.lockWhite : ICONS.unlockPrimary} alt="" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-3 text-sm text-neutral-90">
        <div className="flex flex-col items-center text-center">
          <p>Questions</p>
          <p>30</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <p>Duration</p>
          <p>30 mins</p>
        </div>
      </div>

      <Button
        label="Start Quiz"
        variant="secondary"
        className="w-full border border-primary-84"
      />
    </div>
  );
};

export default QuizCard;
