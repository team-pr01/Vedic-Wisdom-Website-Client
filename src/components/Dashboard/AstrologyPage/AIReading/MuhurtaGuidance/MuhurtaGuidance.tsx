/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ICONS } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";
import Textarea from "../../../../Reusable/TextArea/TextArea";

type TFormData = {
  query: string;
};
const MuhurtaGuidance = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();
  const handleAnalyseMuhurta = (data: TFormData) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleAnalyseMuhurta)}
      className="space-y-4 w-full text-left"
    >
      <Textarea
        label="Your Question / Event"
        placeholder="Find a Muhurta for marriage in 2026. Best time for a new business. Auspicious date for housewarming."
        error={errors.query}
        {...register("query", {
          required: "This field is required",
        })}
      />
      <Button
        type="submit"
        label="Submit"
        rightIcon={ICONS.arrowRight}
        className="w-full"
      />
    </form>
  );
};

export default MuhurtaGuidance;
