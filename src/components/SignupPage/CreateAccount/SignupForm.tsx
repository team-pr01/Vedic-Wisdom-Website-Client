/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { emailValidator } from "../../../utils/emailValidator";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { useState } from "react";
import SelectDropdownWithSearch from "../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ICONS } from "../../../assets";

type TFormData = {
  role: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
};

const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [phone, setPhone] = useState<string | undefined>("");

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setValue("phone", value || "");
    if (value) {
      clearErrors("phone");
    }
  };

  const role = watch("role");

  const handleSignup = (data: TFormData) => {
    if (!role) {
      setFieldErrors((prev: any) => ({
        ...prev,
        role: "Role is required",
      }));
    }
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

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
          options={["User", "Temple", "Organization"]}
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
              errors.phone ? "border-red-500" : "border-neutral-55"
            }`}
            placeholder="Enter phone number"
            required
            onBlur={() => {
              if (!phone) {
                setValue("phone", "");
              }
            }}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
          isDisabled={!agreeToTerms}
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
