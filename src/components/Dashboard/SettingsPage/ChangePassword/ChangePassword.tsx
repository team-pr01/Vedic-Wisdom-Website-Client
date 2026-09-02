import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { useState } from "react";

type TFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface ChangePasswordProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ChangePassword = ({
  isModalOpen,
  setIsModalOpen,
}: ChangePasswordProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<TFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Watch the new password field for validation
  const newPassword = watch("newPassword");

  // Validate confirm password
  const validateConfirmPassword = (value: string) => {
    if (!value) return "Please confirm your password";
    if (value !== newPassword) return "Passwords do not match";
    clearErrors("confirmPassword");
    return true;
  };

  // Handle form submission
  const handleChangePassword = async (data: TFormData) => {
    setIsLoading(true);
    try {
      // Add your API call here to change password
      console.log("Password change data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and close modal on success
      reset();
      setIsModalOpen(false);

      // You can add a success toast/notification here
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error - you can set errors using setError
      setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close with form reset
  const handleModalClose = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={handleModalClose}>
      <div className="space-y-4 w-full">
        <div className="text-center">
          <h2 className="text-2xl font-Manrope font-semibold text-neutral-10">
            Change Password
          </h2>
          <p className="text-neutral-50 text-sm font-Manrope mt-1">
            Enter your current password and create a new one
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-4 w-full mt-6 text-left"
        >
          {/* Current Password */}
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            error={errors.currentPassword}
            {...register("currentPassword", {
              required: "Current password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isCurrentPasswordVisible}
            setIsPasswordVisible={setIsCurrentPasswordVisible}
          />

          {/* New Password */}
          <PasswordInput
            label="New Password"
            placeholder="Must be at least 8 characters"
            error={errors.newPassword}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
            isPasswordVisible={isNewPasswordVisible}
            setIsPasswordVisible={setIsNewPasswordVisible}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your new password"
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: validateConfirmPassword,
            })}
            isPasswordVisible={isConfirmNewPasswordVisible}
            setIsPasswordVisible={setIsConfirmNewPasswordVisible}
          />

          {/* Password requirements hint */}
          <div className="text-xs text-neutral-60 font-Manrope space-y-0.5">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside pl-2 space-y-0.5">
              <li>At least 8 characters</li>
              <li>At least one letter</li>
              <li>At least one number</li>
            </ul>
          </div>

          <Button
            type="submit"
            label="Change Password"
            className="w-full bg-gradient-primary-button text-white font-Manrope font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
