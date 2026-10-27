/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { emailValidator } from "../../../utils/emailValidator";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { useState } from "react";
import SelectDropdownWithSearch from "../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import Button from "../../Reusable/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ICONS } from "../../../assets";
import {
  useSignupMutation,
  useSocialLoginMutation,
} from "../../../redux/Features/Auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

type TFormData = {
  role: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  referralCode?: string;
};

const SignupForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [socialLogin] = useSocialLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [phone, setPhone] = useState<string | undefined>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [isSocialLoading, setIsSocialLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    watch,
  } = useForm<TFormData>();

  const [fieldErrors, setFieldErrors] = useState<any>({
    role: "",
  });

  // Watch referralCode so we can pass it to Google Sign-In if they filled it out
  const watchedReferralCode = watch("referralCode");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handlePhoneChange = (value: string | undefined) => {
    console.log("Full phone value:", value);
    setPhone(value);
    setValue("phoneNumber", value || "");

    // Extract country code from the phone number
    if (value) {
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed) {
          const code = parsed.countryCallingCode;
          setCountryCode(code);
          setValue("countryCode", code);
          console.log("Country Code:", code);
        }
      } catch (error) {
        console.log("Error parsing phone number:", error);
      }
    } else {
      setCountryCode("");
      setValue("countryCode", "");
    }

    if (value) {
      clearErrors("phoneNumber");
    }
  };

  const role = watch("role");

  const handleSignup = async (data: TFormData) => {
    if (!role) {
      setFieldErrors((prev: any) => ({
        ...prev,
        role: "Role is required",
      }));
      return;
    }

    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        countryCode: countryCode,
        phoneNumber: data.phoneNumber,
        role: data.role,
        referralCode: data.referralCode,
      };
      const response = await signup(payload).unwrap();
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
      toast.error(error?.data?.message || "Signup failed. Please try again.");
    }
  };

  // ✅ Shared handler for social auth
  const handleSocialAuth = async (
    idToken: string,
    provider: "google" | "apple",
  ) => {
    setIsSocialLoading(true);
    try {
      const response = await socialLogin({
        idToken,
        provider,
        // Pass the referral code if they typed one in the form
        referralCode: watchedReferralCode || undefined,
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

  // ✅ Google Success Handler
  const handleGoogleSuccess = (credentialResponse: any) => {
    if (!credentialResponse?.credential) {
      toast.error("Failed to get Google credentials");
      return;
    }
    handleSocialAuth(credentialResponse.credential, "google");
  };

  const roles = [
    { label: "User", value: "user" },
    { label: "Temple", value: "temple" },
    { label: "Organization", value: "organization" },
  ];

  return (
    <div className="p-8 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box font-Manrope rounded-4xl">
      <h1 className="text-neutral-40 text-3xl font-semibold text-center">
        Create Your Account
      </h1>
      <p className="description text-center mt-2">
        Join our community to explore timeless spiritual wisdom
      </p>

      <form className="space-y-4 mt-10" onSubmit={handleSubmit(handleSignup)}>
        <SelectDropdownWithSearch
          label="Choose Registration Type"
          name="role"
          options={roles}
          onChange={(value) => setValue("role", value.toLocaleLowerCase())}
          isRequired={true}
          error={fieldErrors.role}
        />
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullName}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

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

        {/* Phone Input with Country Code */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-40 text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            international
            defaultCountry="BD"
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full px-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white ${
              errors.phoneNumber ? "border-red-500" : "border-neutral-55"
            }`}
            placeholder="Enter phone number"
            required
            onBlur={() => {
              if (!phone) {
                setValue("phoneNumber", "");
              }
            }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

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

        <TextInput
          label="Referral Code (Optional)"
          placeholder="Enter your Referral Code"
          error={errors.referralCode}
          {...register("referralCode")}
          isRequired={false}
        />

        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="peer opacity-0 absolute w-5 h-5 cursor-pointer"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
              required
            />
            <div className="w-5 h-5 border-2 border-neutral-55 rounded-md peer-checked:bg-primary-10 peer-checked:border-primary-10 flex items-center justify-center transition-colors">
              {agreeToTerms && (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
          </div>
          <label
            htmlFor="agreeToTerms"
            className="text-neutral-40 font-medium text-sm cursor-pointer"
          >
            I agree with the{" "}
            <Link
              to="/terms-and-conditions"
              className="text-primary-10 hover:underline"
            >
              Terms and Conditions
            </Link>
            .
          </label>
        </div>

        <Button
          label="Create Account"
          className="w-full mt-3"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading || !agreeToTerms}
        />
      </form>

      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-75 h-px w-full"></div>
          <p className="text-neutral-50 font-medium">OR</p>
          <div className="bg-neutral-75 h-px w-full"></div>
        </div>

        {/* Google Sign-In */}
        <div className="relative w-full h-[56px] group">
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center gap-3 text-neutral-10 font-semibold text-lg py-3.5 px-6 rounded-[9px] border border-neutral-55 bg-white w-full pointer-events-none"
          >
            <img src={ICONS.google} alt="Google" className="size-6" />
            <span>Continue with Google</span>
          </button>

          {/* Invisible Google Iframe overlay */}
          <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer [&>div]:!w-full [&>div]:!h-full [&>div>div]:!w-full [&>div>div]:!h-full">
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

          {/* 3. Loading Overlay */}
          {isSocialLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-[9px] z-10">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-10"></span>
            </div>
          )}
        </div>

        {/* Apple Sign-In */}
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
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-primary-10 cursor-pointer"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
