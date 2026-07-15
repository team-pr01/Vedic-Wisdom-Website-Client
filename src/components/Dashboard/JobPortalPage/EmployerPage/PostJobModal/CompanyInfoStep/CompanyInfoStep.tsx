/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaBuilding, FaUser, FaUpload, FaTimes } from "react-icons/fa";
import TextInput from "../../../../../Reusable/TextInput/TextInput";

interface CompanyInfoStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  hiringType: "company" | "individual";
  setHiringType: (type: "company" | "individual") => void;
  tradeLicense: File | null;
  setTradeLicense: (file: File | null) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

const CompanyInfoStep = ({
  register,
  errors,
  watch,
  setValue,
  hiringType,
  setHiringType,
  tradeLicense,
  handleFileUpload,
  removeFile,
}: CompanyInfoStepProps) => {
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

      {/* Hiring Type */}
      <div>
        <label className="text-neutral-10 text-sm font-medium block mb-2">
          Hiring Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-2 ${
              hiringType === "company"
                ? "border-primary-10 bg-primary-10/10"
                : "border-neutral-20 hover:border-primary-10/50"
            }`}
            onClick={() => setHiringType("company")}
          >
            <div
              className={`${
                hiringType === "company" ? "bg-primary-10/20" : "bg-neutral-55/70"
              } size-12 rounded-full p-1 flex items-center justify-center`}
            >
              <FaBuilding
                className={`text-lg ${
                  hiringType === "company" ? "text-primary-10" : "text-neutral-50"
                }`}
              />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-90">Company</h4>
              <p className="text-xs text-neutral-60 mt-1">
                You are hiring on behalf of a Company
              </p>
            </div>
          </div>
          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-2 ${
              hiringType === "individual"
                ? "border-primary-10 bg-primary-10/10"
                : "border-neutral-20 hover:border-primary-10/50"
            }`}
            onClick={() => setHiringType("individual")}
          >
            <div
              className={`${
                hiringType === "individual" ? "bg-primary-10/20" : "bg-neutral-55/70"
              } size-12 rounded-full p-1 flex items-center justify-center`}
            >
              <FaUser
                className={`text-lg ${
                  hiringType === "individual" ? "text-primary-10" : "text-neutral-50"
                }`}
              />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-90">Individual</h4>
              <p className="text-xs text-neutral-60 mt-1">
                You are hiring as an Individual
              </p>
            </div>
          </div>
        </div>
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

      {/* Company Address */}
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

      {/* Trade License Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-neutral-10 text-sm font-medium">
          Trade License Upload
        </label>
        <div className="border-2 border-dashed border-neutral-55 rounded-lg p-6 text-center hover:border-primary-10 transition-colors cursor-pointer bg-neutral-10/5">
          <input
            type="file"
            id="tradeLicense"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="tradeLicense" className="cursor-pointer block">
            <FaUpload className="mx-auto text-neutral-40 text-2xl mb-2" />
            <p className="text-neutral-90 font-medium">Browse File</p>
            <p className="text-neutral-40 text-xs mt-1">
              Supported format: PDF, DOC, DOCX, JPG, PNG
            </p>
            <p className="text-neutral-40 text-xs">Max size: 5MB</p>
          </label>
        </div>
        {tradeLicense && (
          <div className="flex items-center justify-between bg-primary-10/10 px-3 py-2 rounded-lg">
            <span className="text-sm text-neutral-90">{tradeLicense.name}</span>
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