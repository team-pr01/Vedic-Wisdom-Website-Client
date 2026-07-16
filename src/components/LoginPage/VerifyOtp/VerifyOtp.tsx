/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ICONS } from "../../../assets";
import { 
  useVerifyForgotPasswordOtpMutation, 
  useResendForgotPasswordOtpMutation 
} from "../../../redux/Features/Auth/authApi";

type TFormData = {
  email: string;
  otp: string;
};

type TModalType = "forgotPassword" | "verifyOtp" | "resetPassword";

const VerifyOtp = ({
  setModalType,
}: {
  setModalType: React.Dispatch<React.SetStateAction<TModalType>>;
}) => {
  const [verifyForgotPasswordOtp] = useVerifyForgotPasswordOtpMutation();
  const [resendForgotPasswordOtp] = useResendForgotPasswordOtpMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<TFormData>();

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [email, setEmail] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [otpError, setOtpError] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    setEmail(email);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (isVerified && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isVerified && countdown === 0) {
      // Redirect to reset password modal
      setModalType("resetPassword");
    }
  }, [isVerified, countdown, setModalType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[idx] = val;
    setOtpValues(newOtpValues);

    const otpString = newOtpValues.join("");
    setValue("otp", otpString);

    // Clear OTP error once user starts typing again
    clearErrors("otp");
    setOtpError("");

    trigger("otp");

    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Auto submit when all digits are filled
    if (newOtpValues.every((digit) => digit !== "")) {
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" && otpValues[idx] === "" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (data: TFormData) => {
    try {
      const response = await verifyForgotPasswordOtp({
        email,
        otp: data.otp,
      }).unwrap();

      if (response?.success) {
        setIsVerified(true);
        setCountdown(3);
      } else {
        setOtpError(response?.message || "Invalid OTP. Please try again.");
        setError("otp", {
          type: "manual",
          message: response?.message || "Invalid OTP. Please try again.",
        });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Invalid OTP. Please try again.";
      setOtpError(errorMessage);
      setError("otp", {
        type: "manual",
        message: errorMessage,
      });
      console.error("OTP Verification failed:", err);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setOtpValues(["", "", "", ""]);
    setValue("otp", "");
    clearErrors("otp");
    setOtpError("");

    try {
      
      const response = await resendForgotPasswordOtp({
        email,
      }).unwrap();

      if (response?.success) {
        setTimeLeft(120);
        setCanResend(false);
        // Show success message
        alert("OTP has been resent to your email.");
      } else {
        alert(response?.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("Resend OTP failed:", err);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col items-center gap-6 font-Manrope mt-6 w-full"
    >
      {/* OTP Error */}
      {errors?.otp && !isVerified && (
        <p className="text-red-500 text-sm text-center">
          {errors?.otp?.message}
        </p>
      )}

      {/* OTP Inputs */}
      <div className="flex items-center gap-5 md:gap-8">
        <div className="flex gap-2 md:gap-4 justify-center">
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="one-time-code"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[idx] = el;
              }}
              disabled={isVerified}
              className={`bg-neutral-30 size-10 md:size-14 2xl:size-17 text-center text-xl rounded-lg lg:rounded-xl border transition-colors focus:outline-none ${
                digit && !errors.otp && !isSubmitting
                  ? "border-primary-5 text-primary-5 focus:border-primary-5"
                  : isSubmitting
                    ? "border-primary-10 opacity-40 animate-pulse text-primary-5"
                    : errors?.otp || otpError
                      ? "border-red-500 focus:border-red-500 text-red-500"
                      : "border-neutral-60/60 focus:border-primary-5 text-primary-5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Loading Spinner */}
      {isSubmitting && !isVerified && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-primary-5 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success Message */}
      {isVerified && (
        <p className="text-center text-neutral-5 font-GeneralSans text-sm mt-2">
          <span className="text-green-700">OTP is verified.</span> Redirecting
          to reset password in{" "}
          <span className="font-medium text-primary-10">
            {countdown} seconds
          </span>
        </p>
      )}

      {/* Resend Section - Hide when verified */}
      {!isVerified && (
        <div className="flex items-center">
          {canResend ? (
            <button
              type="button"
              className="w-fit flex items-center gap-1 hover:underline text-primary-10 font-medium"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend OTP"}
              {!isResending && <img src={ICONS.arrowRight} alt="" className="size-5" />}
            </button>
          ) : (
            <p className="text-sm md:text-base leading-6 text-neutral-5">
              Didn't receive OTP? Resend in{" "}
              <span className="font-semibold text-primary-10">{formatTime(timeLeft)}</span>
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default VerifyOtp;