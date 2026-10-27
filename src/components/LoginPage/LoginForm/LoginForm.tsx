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
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "../../../redux/Features/Auth/authApi";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

type TFormData = {
  email: string;
  password: string;
};

type TModalType = "forgotPassword" | "verifyOtp" | "resetPassword";

const LoginForm = () => {
  const [socialLogin] = useSocialLoginMutation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<TModalType>("forgotPassword");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSocialLoading, setIsSocialLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  // Capture referral code from URL if present
  const referralCode =
    new URLSearchParams(window.location.search).get("referralCode") ||
    undefined;

  // 🔁 Shared handler for all social providers (Google, Apple, etc.)
  const handleSocialAuth = async (
    idToken: string,
    provider: "google" | "apple",
  ) => {
    setIsSocialLoading(true);
    try {
      const response = await socialLogin({
        idToken,
        provider,
        referralCode,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setUser({
            user: response?.data?.user,
            token: response?.data?.accessToken,
          }),
        );
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `${provider} login failed.`);
    } finally {
      setIsSocialLoading(false);
    }
  };

  // ✅ Google success handler
  const handleGoogleSuccess = (credentialResponse: any) => {
    if (!credentialResponse?.credential) {
      toast.error("Failed to get Google credentials");
      return;
    }
    handleSocialAuth(credentialResponse.credential, "google");
  };

  const handleLogin = async (data: TFormData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const response = await login(payload).unwrap();
      if (response?.success) {
        dispatch(
          setUser({
            user: response?.data?.user,
            token: response?.data?.accessToken,
          }),
        );
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

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
        return { title: "", description: "", component: null };
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

        {/* Google Sign-In */}
        <div className="relative w-full h-[60px]">
          {/* Custom Button (Visual only) */}
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center gap-3 text-neutral-10 font-semibold text-lg py-3.5 px-6 rounded-[9px] border border-neutral-55 bg-white w-full pointer-events-none"
          >
            <img src={ICONS.google} alt="Google" className="size-6" />
            <span>Continue with Google</span>
          </button>

          {/* Invisible Google Iframe Overlay */}
          <div className="absolute inset-0 opacity-0 cursor-pointer [&>div]:!w-full [&>div]:!h-full [&>div>div]:!w-full [&>div>div]:!h-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed")}
              type="standard"
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="380"
            />
          </div>

          {/* Loading Spinner Overlay */}
          {isSocialLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-[9px] z-10">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-10"></span>
            </div>
          )}
        </div>

        {/* 🍎 Apple Sign-In (Placeholder for future) */}
        <button
          type="button"
          onClick={() => toast("Apple Sign-In coming soon", { icon: "🍎" })}
          className="flex items-center justify-center gap-3 text-neutral-10 font-semibold text-lg py-3.5 px-6 rounded-[9px] border border-neutral-55 bg-white w-full"
        >
          <img src={ICONS.apple} alt="Apple" className="size-6" />
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
