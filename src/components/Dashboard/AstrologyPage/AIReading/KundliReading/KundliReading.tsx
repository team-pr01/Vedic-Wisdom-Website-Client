/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../../Reusable/Button/Button";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import { ICONS } from "../../../../../assets";

type TFormData = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

const KundliReading = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();
  const handleAnalyseKundli = (data: TFormData) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleAnalyseKundli)}
      className="space-y-4 w-full text-left"
    >
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.name}
        {...register("name", {
          required: "Full name is required",
        })}
      />
      <div className="flex items-center gap-3">
        <TextInput
        label="Birth Date"
        type="date"
        error={errors.birthDate}
        {...register("birthDate", {
          required: "Birth date is required",
        })}
      />
      <TextInput
        label="Birth Time"
        type="time"
        error={errors.birthTime}
        {...register("birthTime", {
          required: "Birth time is required",
        })}
      />
      </div>
      <TextInput
        label="Birth Place"
        placeholder="Enter your birth place"
        error={errors.birthPlace}
        {...register("birthPlace", {
          required: "Birth place is required",
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

export default KundliReading;
