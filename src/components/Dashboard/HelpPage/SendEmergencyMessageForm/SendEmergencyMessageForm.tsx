/* eslint-disable @typescript-eslint/no-explicit-any */
import TextInput from "../../../Reusable/TextInput/TextInput";
import { ICONS } from "../../../../assets";
import { useForm } from "react-hook-form";
import Textarea from "../../../Reusable/TextArea/TextArea";

type TFormData = {
  name: string;
  phoneNumber: string;
  location: string;
  message: string;
};

const SendEmergencyMessageForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  const handleSendEmergencyMessage = (data: TFormData) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSendEmergencyMessage)}
      className="bg-accent-35 p-6 rounded-4xl space-y-5 mt-4"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-md flex items-center justify-center">
          <img src={ICONS.alert} alt="" />
        </div>
        <div>
          <h3 className="text-white font-bold">Send us a message</h3>
          <p className="text-neutral-55 text-sm">
            Please reach out to our customer support team for immediate help
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <TextInput
          placeholder="Enter your full name...."
          error={errors.name}
          {...register("name", {
            required: "Name is required",
          })}
        />
        <TextInput
          placeholder="Enter your phone number...."
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
        />
        <TextInput
          placeholder="Enter your location...."
          error={errors.location}
          {...register("location", { required: "Location is required" })}
        />
        <Textarea
          placeholder="Briefly describe your emergency...."
          error={errors.message}
          {...register("message", { required: "Message is required" })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-white rounded-md text-neutral-90 font-semibold text-sm px-3 py-3.5"
      >
        Send Emergency Alert
      </button>
    </form>
  );
};

export default SendEmergencyMessageForm;
