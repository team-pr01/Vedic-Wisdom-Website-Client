/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaUpload, FaTimes } from "react-icons/fa";
import TextInput from "../../../../../Reusable/TextInput/TextInput";
import FilterDropdown from "../../../../SanathanSthalPage/Filters/FilterDropdown";
import { Country, State, City } from "country-state-city";
import { useState } from "react";

interface CompanyInfoStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  companyLogo: File | null;
  setCompanyLogo: (file: File | null) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

const CompanyInfoStep = ({
  register,
  errors,
  setValue,
  companyLogo,
  handleFileUpload,
  removeFile,
}: CompanyInfoStepProps) => {
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
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
        <h2 className="text-xl font-bold text-neutral-90">
          Company Information
        </h2>
        <p className="text-sm text-neutral-60 mt-0.5">
          Tell us about your organization
        </p>
      </div>
      {/* Company Name */}
      <TextInput
        label="Company Name"
        placeholder="Enter company name"
        error={errors.companyName}
        {...register("companyName", {
          required: "Company name is required",
        })}
      />

      {/* Location */}
      <div className="grid grid-cols-3 gap-3">
        <FilterDropdown
          label="Country"
          options={countryOptions}
          value={country}
          onChange={handleCountrySelect}
          isRequired={true}
          placeholder="Select country"
        />
        <FilterDropdown
          label="State"
          options={stateOptions}
          value={state}
          onChange={handleStateSelect}
          isRequired={true}
          placeholder="Select state"
          dropdownDirection="bottom-full"
        />
        <FilterDropdown
          label="City"
          options={cityOptions}
          value={city}
          onChange={handleCitySelect}
          isRequired={true}
          placeholder="Select city"
          dropdownDirection="bottom-full"
        />
      </div>

      <TextInput
        label="Company Address"
        placeholder="Enter full address"
        error={errors.companyAddress}
        {...register("companyAddress", {
          required: "Company address is required",
        })}
      />

      {/* Contact Number */}
      <TextInput
        label="Contact Number"
        placeholder="Enter phone number"
        type="tel"
        error={errors.contactNumber}
        {...register("contactNumber", {
          required: "Contact number is required",
        })}
      />

      {/* Official Email */}
      <TextInput
        label="Official Email"
        placeholder="Enter email"
        type="email"
        error={errors.officialEmail}
        {...register("officialEmail", {
          required: "Official email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
      />

      <TextInput
        label="Website"
        placeholder="e.g., www.prtech-solutions.com"
        error={errors.website}
        {...register("website")}
        isRequired={false}
      />

      {/* Social Media */}
      <div className="grid grid-cols-3 gap-3">
        <TextInput
          label="Facebook"
          placeholder="e.g., facebook.com/yourpage"
          error={errors.facebook}
          {...register("facebook")}
          isRequired={false}
        />
        <TextInput
          label="Instagram"
          placeholder="e.g., instagram.com/yourprofile"
          error={errors.instagram}
          {...register("instagram")}
          isRequired={false}
        />
        <TextInput
          label="LinkedIn"
          placeholder="e.g., linkedin.com/company/yourcompany"
          error={errors.linkedin}
          {...register("linkedin")}
          isRequired={false}
        />
      </div>

      {/* Company Logo Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-neutral-10 text-sm font-medium">
          Company Logo <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-neutral-55 rounded-lg p-6 text-center hover:border-primary-10 transition-colors cursor-pointer bg-neutral-10/5">
          <input
            type="file"
            id="companyLogo"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="companyLogo" className="cursor-pointer block">
            <FaUpload className="mx-auto text-neutral-40 text-2xl mb-2" />
            <p className="text-neutral-90 font-medium">Browse File</p>
            <p className="text-neutral-40 text-xs mt-1">
              Supported format: JPG, PNG, WEBP
            </p>
            <p className="text-neutral-40 text-xs">Max size: 5MB</p>
          </label>
        </div>
        {errors.companyLogo && (
          <span className="text-red-500 text-sm">{errors.companyLogo.message}</span>
        )}
        {companyLogo && (
          <div className="flex items-center justify-between bg-primary-10/10 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <img
                src={URL.createObjectURL(companyLogo)}
                alt="Company Logo"
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-sm text-neutral-90">{companyLogo.name}</span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfoStep;