import { useForm } from "react-hook-form";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import Textarea from "../../../../Reusable/TextArea/TextArea";
import Button from "../../../../Reusable/Button/Button";
import { ICONS } from "../../../../../assets";

type TFormData = {
  name: string;
  email: string;
  phone: string;
  salary: string;
  availability: string;
  portfolioUrl: string;
  experienceLevel: string;
  additionalMessage: string;
  termsAccepted: boolean;
};

const JobApplyForm = ({
  setIsSubmitted,
}: {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isSubmitting = false;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TFormData>();

  const selectedExperience = watch("experienceLevel");

  const experienceOptions = [
    { label: "Fresher (0-1 year)", value: "fresher" },
    { label: "Junior (1-3 years)", value: "junior" },
    { label: "Mid-level (3-5 years)", value: "mid" },
    { label: "Senior (5+ years)", value: "senior" },
  ];

  const onSubmit = (data: TFormData) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Application Data:", data);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-neutral-90 text-xl font-bold">
          Apply for this Job
        </h2>
        <p className="text-sm text-neutral-60 mt-1">
          Please fill in the details below to submit your application.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          {/* Email */}
          <TextInput
            label="Email Address"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />

          {/* Phone */}
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="+880 888000000000"
            error={errors.phone}
            {...register("phone", {
              required: "Phone number is required",
            })}
          />

          {/* Expected Salary */}
          <TextInput
            label="Expected Salary (Optional)"
            placeholder="$100k-$120k"
            error={errors.salary}
            {...register("salary")}
            isRequired={false}
          />

          {/* Portfolio URL */}
          <TextInput
            label="CV/Resume Link"
            placeholder="Upload google drive or other link"
            error={errors.portfolioUrl}
            {...register("portfolioUrl")}
          />
        </div>

        {/* Experience Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-10 text-sm font-medium">
            Experience Level <span className="text-primary-10">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {experienceOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedExperience === option.value
                    ? "border-primary-10 bg-primary-10/10"
                    : "border-neutral-20 hover:border-primary-10/50"
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("experienceLevel", {
                    required: "Experience level is required",
                  })}
                  className="accent-primary-10"
                />
                <span className="text-sm text-neutral-60">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.experienceLevel && (
            <span className="text-red-500 text-sm">
              {errors.experienceLevel.message}
            </span>
          )}
        </div>

        <Textarea
          label="Additional Information (Optional)"
          placeholder="Write a short message to the employer..."
          error={errors.additionalMessage}
          {...register("additionalMessage")}
          isRequired={false}
        />

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 accent-primary-10 cursor-pointer"
            {...register("termsAccepted", {
              required: "You must agree to the terms",
            })}
          />
          <label
            htmlFor="terms"
            className="text-sm text-neutral-60 cursor-pointer"
          >
            I declare that this information is accurate.
          </label>
        </div>
        {errors.termsAccepted && (
          <span className="text-red-500 text-sm -mt-2 block">
            {errors.termsAccepted.message}
          </span>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          label={isSubmitting ? "Submitting..." : "Submit Application"}
          className="w-full mt-2"
          rightIcon={!isSubmitting && ICONS.arrowRight}
          isDisabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default JobApplyForm;
