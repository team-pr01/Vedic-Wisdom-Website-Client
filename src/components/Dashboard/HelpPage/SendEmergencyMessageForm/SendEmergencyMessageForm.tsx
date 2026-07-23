/* eslint-disable @typescript-eslint/no-explicit-any */
import TextInput from "../../../Reusable/TextInput/TextInput";
import { ICONS } from "../../../../assets";
import { useForm } from "react-hook-form";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { usePostEmergencyMessageMutation } from "../../../../redux/Features/Emergencies/emergencyApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";

type TFormData = {
  name: string;
  phoneNumber: string;
  location: string;
  message: string;
  userId: string;
};

const SendEmergencyMessageForm = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [postEmergencyMessage, { isLoading }] =
    usePostEmergencyMessageMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormData>();

  const handleSendEmergencyMessage = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
        userId: user?._id,
      };
      const response = await postEmergencyMessage(payload).unwrap();
      if (response?.success) {
        toast.success(
          "We have received your message. We will get back to you soon.",
        );
        reset();
      }
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
        className="w-full bg-white disabled:bg-neutral-55 transition duration-300 rounded-md text-neutral-90 font-semibold text-sm px-3 py-3.5 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin size-5.25"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Please wait...</span>
          </>
        ) : (
          "Send Emergency Alert"
        )}
      </button>
    </form>
  );
};

export default SendEmergencyMessageForm;
