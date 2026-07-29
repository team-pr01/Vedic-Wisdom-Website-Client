/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TextInput from "../../../../../Reusable/TextInput/TextInput";
import FilterDropdown from "../../../../SanathanSthalPage/Filters/FilterDropdown";
import { Country, State, City } from "country-state-city";
import Textarea from "../../../../../Reusable/TextArea/TextArea";

interface JobDetailsStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  setCountry: any;
  setState: any;
  setCity: any;
  country: any;
  state: any;
  city: any;
}

const JobDetailsStep = ({
  register,
  errors,
  watch,
  setValue,
  setCountry,
  setState,
  setCity,
  country,
  state,
  city,
}: JobDetailsStepProps) => {

  // States for location hierarchy
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const countries = Country.getAllCountries();
  const countryOptions = countries.map((country) => ({
    label: country?.name,
    value: country?.isoCode,
    isoCode: country?.isoCode,
    countryData: country,
  }));

  const stateOptions = states.map((state) => ({
    label: state?.name,
    value: state?.isoCode,
    isoCode: state?.isoCode,
    stateData: state,
  }));

  const cityOptions = cities.map((city) => ({
    label: city?.name,
    value: city?.name,
    cityData: city,
  }));

  // Handle country selection
  const handleCountrySelect = (selected: any) => {
    setSelectedCountry(selected);
    setCities([]);
    setState(null);
    setCity(null);
    setValue("country", selected?.label || "");

    if (selected?.isoCode) {
      const countryStates = State.getStatesOfCountry(selected.isoCode);
      setStates(countryStates);
    }

    setCountry(selected);
  };

  // Handle state selection
  const handleStateSelect = (selected: any) => {
    setCities([]);
    setCity(null);
    setValue("state", selected?.label || "");

    if (selected?.value && selectedCountry?.isoCode) {
      const stateCities = City.getCitiesOfState(
        selectedCountry.isoCode,
        selected.value,
      );
      setCities(stateCities);
    }

    setState(selected);
  };

  // Handle city selection
  const handleCitySelect = (selected: any) => {
    setCity(selected);
    setValue("city", selected?.label || "");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-neutral-90">Post a New Job</h2>
        <p className="text-sm text-neutral-60 mt-0.5">
          Fill in the job details below
        </p>
      </div>

      {/* Job Title */}
      <TextInput
        label="Job Title"
        placeholder="Enter job title"
        error={errors.jobTitle}
        {...register("jobTitle", {
          required: "Job title is required",
        })}
      />

      {/* Mode & Job Type - Side by Side */}
      <div className="flex gap-5">
        {/* Mode */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Mode <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {["Remote", "Onsite", "Hybrid"].map((mode) => (
              <label
                key={mode}
                className={`px-4 py-1.5 rounded-full border-2 cursor-pointer transition-all duration-300 text-sm ${
                  watch("mode") === mode
                    ? "border-primary-10 bg-primary-10/10 text-primary-10"
                    : "border-neutral-20 hover:border-primary-10/50 text-neutral-60"
                }`}
              >
                <input
                  type="radio"
                  value={mode}
                  {...register("mode", { required: "Mode is required" })}
                  className="hidden"
                />
                {mode}
              </label>
            ))}
          </div>
          {errors.mode && (
            <span className="text-red-500 text-sm">{errors.mode.message}</span>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Job Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {["Full-Time", "Part-Time", "Contract", "Internship"].map(
              (type) => (
                <label
                  key={type}
                  className={`px-4 py-1.5 rounded-full border-2 cursor-pointer transition-all duration-300 text-sm ${
                    watch("jobType") === type
                      ? "border-primary-10 bg-primary-10/10 text-primary-10"
                      : "border-neutral-20 hover:border-primary-10/50 text-neutral-60"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("jobType", {
                      required: "Job type is required",
                    })}
                    className="hidden"
                  />
                  {type}
                </label>
              ),
            )}
          </div>
          {errors.jobType && (
            <span className="text-red-500 text-sm">
              {errors.jobType.message}
            </span>
          )}
        </div>
      </div>

      {/* Location Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FilterDropdown
          label="Country"
          options={countryOptions}
          value={country}
          onChange={handleCountrySelect}
          isRequired={false}
          placeholder="Select country"
        />

        <FilterDropdown
          label="State"
          options={stateOptions}
          value={state}
          onChange={handleStateSelect}
          isRequired={false}
          placeholder="Select state"
        />

        <FilterDropdown
          label="City"
          options={cityOptions}
          value={city}
          onChange={handleCitySelect}
          isRequired={false}
          placeholder="Select city"
          dropdownDirection="bottom-full"
        />
      </div>

      {/* Address */}
      <TextInput
        label="Office Address"
        placeholder="Enter office address"
        error={errors.address}
        {...register("address")}
        isRequired={false}
      />

      {/* Education Level */}
      <TextInput
        label="Education Level"
        placeholder="e.g. Bachelor's in Science"
        error={errors.educationLevel}
        {...register("educationLevel", {
          required: "Education level is required",
        })}
      />

      {/* Salary Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TextInput
          label="Currency"
          placeholder="e.g. BDT"
          error={errors.currency}
          {...register("currency", {
            required: "Currency is required",
          })}
        />
        <TextInput
          label="Minimum Salary"
          placeholder="Min"
          type="number"
          error={errors.minimum}
          {...register("minimum", {
            required: "Minimum salary is required",
          })}
        />
        <TextInput
          label="Maximum Salary"
          placeholder="Max"
          type="number"
          error={errors.maximum}
          {...register("maximum", {
            required: "Maximum salary is required",
          })}
        />
      </div>

      {/* Experience Level */}
      <div>
        <label className="text-neutral-10 text-sm font-medium block mb-2">
          Experience Level <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { label: "Fresher (0-1 year)", value: "fresher" },
            { label: "Junior (1-3 years)", value: "junior" },
            { label: "Mid-level (3-5 years)", value: "mid" },
            { label: "Senior (5+ years)", value: "senior" },
          ].map((exp) => (
            <label
              key={exp.value}
              className={`flex items-center gap-2 p-2.5 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                watch("experienceLevel") === exp.value
                  ? "border-primary-10 bg-primary-10/10"
                  : "border-neutral-20 hover:border-primary-10/50"
              }`}
            >
              <input
                type="radio"
                value={exp.value}
                {...register("experienceLevel", {
                  required: "Experience level is required",
                })}
                className="accent-primary-10"
              />
              <span className="text-sm text-neutral-60">{exp.label}</span>
            </label>
          ))}
        </div>
        {errors.experienceLevel && (
          <span className="text-red-500 text-sm">
            {errors.experienceLevel.message}
          </span>
        )}
      </div>

      {/* Job Description */}
      <Textarea
        label="Job Description"
        placeholder="Clearly describe the job role, responsibilities, and expectations..."
        error={errors.jobDescription}
        rows={4}
        {...register("jobDescription", {
          required: "Job description is required",
          minLength: {
            value: 50,
            message: "Description must be at least 50 characters",
          },
        })}
      />

      {/* Required Skills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-neutral-10 text-sm font-medium">
          Required Skills <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Skills: communication, teamwork..."
          className="w-full px-4 py-3 rounded-lg border border-neutral-55 focus:outline-none focus:border-primary-10 transition duration-300 bg-white resize-none"
          rows={2}
          {...register("requiredSkills", {
            required: "Required skills are required",
          })}
        />
        {errors.requiredSkills && (
          <span className="text-red-500 text-sm">
            {errors.requiredSkills.message}
          </span>
        )}
      </div>

      {/* Application Deadline & Vacancies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextInput
          label="Application Deadline"
          type="date"
          error={errors.applicationDeadline}
          {...register("applicationDeadline", {
            required: "Application deadline is required",
          })}
        />

        <TextInput
          label="Number of Vacancies"
          placeholder="01"
          type="number"
          error={errors.vacancies}
          {...register("vacancies", {
            required: "Number of vacancies is required",
            min: {
              value: 1,
              message: "At least 1 vacancy required",
            },
          })}
        />
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="confirmInfo"
            {...register("termsAccepted", {
              required: "You must confirm the information",
            })}
            className="w-4 h-4 accent-primary-10 cursor-pointer"
          />
          <label
            htmlFor="confirmInfo"
            className="text-sm text-neutral-60 cursor-pointer"
          >
            I confirm that all information provided is accurate.
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agreeTerms"
            {...register("termsAccepted", {
              required: "You must agree to the terms",
            })}
            className="w-4 h-4 accent-primary-10 cursor-pointer"
          />
          <label
            htmlFor="agreeTerms"
            className="text-sm text-neutral-60 cursor-pointer"
          >
            I agree to the platform's Terms & Conditions.
          </label>
        </div>
        {errors.termsAccepted && (
          <span className="text-red-500 text-sm">
            {errors.termsAccepted.message}
          </span>
        )}
      </div>

      <p className="text-xs text-neutral-40 bg-neutral-10/5 p-3 rounded-lg">
        ⚠️ After deadline passes, this job will automatically show as "Closed"
        on the platform.
      </p>
    </div>
  );
};

export default JobDetailsStep;
