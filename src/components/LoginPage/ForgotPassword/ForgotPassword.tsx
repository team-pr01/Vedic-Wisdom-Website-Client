/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import TextInput from "../../Reusable/TextInput/TextInput";

type TFormData = {
  email: string;
};
const ForgotPassword = ({
  setModalType,
}: {
  setModalType: React.Dispatch<
    React.SetStateAction<"forgotPassword" | "verifyOtp" | "resetPassword">
  >;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();
  const handleForgotPassword = (data: TFormData) => {
    try {
      console.log(data);
      setModalType("verifyOtp");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-4 w-full mt-6 text-left"
      >
        <TextInput
          placeholder="Enter your registered email address"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
          })}
        />
        <Button
          type="submit"
          label="Reset Password"
          rightIcon={ICONS.arrowRight}
          className="w-full"
        />
      </form>
  );
};

export default ForgotPassword;
