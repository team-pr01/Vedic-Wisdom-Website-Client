/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import { useState } from "react";

type TFormData = {
  password: string;
  confirmPassword: string;
};

type TModalType = "forgotPassword" | "verifyOtp" | "resetPassword";

const ResetPassword = ({
  setModalType,
}: {
  setModalType: React.Dispatch<React.SetStateAction<TModalType>>;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm<TFormData>();

  const password = watch("password");

  const handleResetPassword = (data: TFormData) => {
    try {
      console.log("Reset Password Data:", data);
      // API call to reset password
      // On success, show success message and redirect to login
      alert(
        "Password reset successfully! Please login with your new password.",
      );
      setModalType("forgotPassword");
    } catch (error: any) {
      console.log(error);
      setError("password", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    clearErrors("confirmPassword");
    return true;
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="space-y-4 w-full mt-6 text-left"
    >
      <PasswordInput
        label="New Password"
        placeholder="Must be at least 8 Characters"
        error={errors.password}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            message: "Password must contain at least one letter and one number",
          },
        })}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: validateConfirmPassword,
        })}
        isPasswordVisible={isConfirmPasswordVisible}
        setIsPasswordVisible={setIsConfirmPasswordVisible}
      />

      {/* Password Strength Indicator */}
      {password && password.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-neutral-30 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  password.length >= 8 &&
                  /[A-Z]/.test(password) &&
                  /[a-z]/.test(password) &&
                  /\d/.test(password)
                    ? "w-full bg-green-500"
                    : password.length >= 6
                      ? "w-2/3 bg-yellow-500"
                      : "w-1/3 bg-red-500"
                }`}
              />
            </div>
            <span className="text-xs text-neutral-60 font-medium whitespace-nowrap">
              {password.length >= 8 &&
              /[A-Z]/.test(password) &&
              /[a-z]/.test(password) &&
              /\d/.test(password)
                ? "Strong"
                : password.length >= 6
                  ? "Medium"
                  : "Weak"}
            </span>
          </div>
          <p className="text-xs text-neutral-40 mt-1">
            Use 8+ characters with at least one letter and one number
          </p>
        </div>
      )}

      <Button
        type="submit"
        label="Reset Password"
        rightIcon={ICONS.arrowRight}
        className="w-full"
      />
    </form>
  );
};

export default ResetPassword;
