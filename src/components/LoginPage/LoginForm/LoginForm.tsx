/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ICONS } from "../../../assets";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { emailValidator } from "../../../utils/emailValidator";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../Reusable/Button/Button";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Modal from "../../Reusable/Modal/Modal";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/Features/Auth/authApi";
import { setUser } from "../../../redux/Features/Auth/authSlice";

type TFormData = {
  email: string;
  password: string;
};

type TModalType = "forgotPassword" | "verifyOtp" | "resetPassword";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<TModalType>("forgotPassword");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  const handleLogin = async (data: TFormData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const response = await login(payload).unwrap();
      if (response?.success) {
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.user;
        dispatch(
          setUser({
            user: user,
            token: accessToken,
          }),
        );

        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // Modal content based on modalType
  const getModalContent = () => {
    switch (modalType) {
      case "forgotPassword":
        return {
          title: "Forgot Password?",
          description:
            "Enter your email address and we will send you a link to reset your password",
          component: <ForgotPassword setModalType={setModalType} />,
        };
      case "verifyOtp":
        return {
          title: "Verify OTP",
          description:
            "Enter the 6-digit verification code sent to your registered email",
          component: <VerifyOtp setModalType={setModalType} />,
        };
      case "resetPassword":
        return {
          title: "Reset Password",
          description:
            "Create a new password for your account. Make sure it's strong and secure.",
          component: (
            <ResetPassword
              setIsForgotPasswordModalOpen={setIsForgotPasswordModalOpen}
            />
          ),
        };
      default:
        return {
          title: "",
          description: "",
          component: null,
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="p-8 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box font-Manrope rounded-4xl">
      <h1 className="text-neutral-40 text-3xl font-semibold text-center">
        Welcome Back
      </h1>
      <p className="description text-center mt-2">
        Login to continue your spiritual journey
      </p>

      <form className="space-y-4 mt-10" onSubmit={handleSubmit(handleLogin)}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            setValueAs: (value) => value?.replace(/\s+/g, "") || "",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
            validate: (value) => {
              if (!value) return true;
              const domain = value.split("@")[1];
              if (!domain) return true;
              const distance = emailValidator(domain, "gmail.com");
              if (distance <= 2 && domain !== "gmail.com") {
                return `Wrong Gmail format. Did you mean ${
                  value.split("@")[0]
                }@gmail.com?`;
              }
              return true;
            },
          })}
        />

        <div className="w-full">
          <PasswordInput
            label="Password"
            placeholder="Must be at least 8 Characters"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                setModalType("forgotPassword");
                setIsForgotPasswordModalOpen(true);
              }}
              type="button"
              className="text-primary-10 underline font-semibold text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <Button
          label="Login"
          className="w-full"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </form>

      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-75 h-px w-full"></div>
          <p className="text-neutral-50 font-medium">OR</p>
          <div className="bg-neutral-75 h-px w-full"></div>
        </div>
        <button className="flex items-center justify-center gap-3 text-neutral-10 font-semibold text-lg py-3.5 px-6 rounded-[9px] border border-neutral-55 bg-white w-full mt-2">
          <img src={ICONS.google} alt="" className="size-6" />
          <span>Continue with Google</span>
        </button>
        <button className="flex items-center justify-center gap-3 text-neutral-10 font-semibold text-lg py-3.5 px-6 rounded-[9px] border border-neutral-55 bg-white w-full">
          <img src={ICONS.apple} alt="" className="size-6" />
          <span>Continue with Apple</span>
        </button>
      </div>

      <p className="text-sm md:text-base text-neutral-80 mt-10 text-center">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-semibold text-primary-10 cursor-pointer"
        >
          Sign Up
        </a>
      </p>

      <Modal
        isModalOpen={isForgotPasswordModalOpen}
        setIsModalOpen={setIsForgotPasswordModalOpen}
      >
        <div className="flex flex-col items-center text-center p-4">
          <h2 className="text-neutral-90 text-2xl font-bold">
            {modalContent.title}
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
            {modalContent.description}
          </p>
          <div className="w-full mt-6">{modalContent.component}</div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
