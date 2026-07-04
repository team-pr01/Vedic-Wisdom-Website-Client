/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ICONS } from "../../../assets";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { emailValidator } from "../../../utils/emailValidator";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../Reusable/Button/Button";

type TFormData = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  const handleSignup = (data: TFormData) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="p-8 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box font-Manrope rounded-4xl">
      <h1 className="text-neutral-40 text-3xl font-semibold text-center">
        Welcome Back
      </h1>
      <p className="description text-center mt-2">
        Login to continue your spiritual journey
      </p>

      <form className="space-y-4 mt-10" onSubmit={handleSubmit(handleSignup)}>
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

        <Button label="Login" className="w-full mt-3" type="submit" />
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
    </div>
  );
};

export default LoginForm;
