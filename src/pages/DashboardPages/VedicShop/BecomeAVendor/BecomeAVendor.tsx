import { useForm } from "react-hook-form";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import { Link } from "react-router-dom";
import Button from "../../../../components/Reusable/Button/Button";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ICONS, IMAGES } from "../../../../assets";
import SellerInstructions from "../../../../components/Dashboard/VedicShopPage/BecomeAVendorPage/SellerInstructions/SellerInstructions";
import Modal from "../../../../components/Reusable/Modal/Modal";

type TFormData = {
  name: string;
  shopName: string;
  phoneNumber: string;
  email: string;
  documentUrls: string[];
  businessAddress: string;
  description: string;
};

const BecomeAVendor = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [documentError, setDocumentError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TFormData>();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Check if total documents would exceed 2
      if (documents.length + files.length > 2) {
        setDocumentError("Maximum 2 documents allowed");
        return;
      }

      setDocumentError("");
      const updatedFiles = [...documents, ...files];
      setDocuments(updatedFiles);

      // Convert to URLs
      const fileUrls = updatedFiles.map((file) => URL.createObjectURL(file));
      setValue("documentUrls", fileUrls);
    }
  };

  const removeDocument = (index: number) => {
    const updatedFiles = documents.filter((_, i) => i !== index);
    setDocuments(updatedFiles);

    // Update URLs
    const fileUrls = updatedFiles.map((file) => URL.createObjectURL(file));
    setValue("documentUrls", fileUrls);
  };

  const onSubmit = (data: TFormData) => {
    console.log("Form Data:", data);
    console.log("Documents:", documents);
  };

  return (
    <div className="font-Manrope flex gap-10">
      <div className="w-[60%]">
        <DashboardHeading
          title="Sell Your Products Easily"
          description="Reach out to more customer base and boost your sales."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
          {/* Full Name */}
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name}
            {...register("name", {
              required: "Full name is required",
            })}
          />

          {/* Shop Name */}
          <TextInput
            label="Shop Name"
            placeholder="Enter your shop name"
            error={errors.shopName}
            {...register("shopName", {
              required: "Shop name is required",
            })}
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            })}
          />

          {/* Email */}
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />

          {/* Business Address */}
          <TextInput
            label="Business Address"
            placeholder="Enter your business address"
            error={errors.businessAddress}
            {...register("businessAddress", {
              required: "Business address is required",
            })}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-10 text-sm font-medium">
              Shop Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe your shop and products"
              className={`w-full px-4 py-3 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white resize-none ${
                errors.description ? "border-red-500" : "border-neutral-55"
              }`}
              rows={4}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Document Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-10 text-sm font-medium">
              Upload Documents <span className="text-red-500">*</span>
              <span className="text-neutral-40 text-xs font-normal ml-2">
                (Max 2 documents)
              </span>
            </label>

            {documents.length < 2 && (
              <div className="border-2 border-dashed border-neutral-55 rounded-lg p-6 text-center hover:border-primary-10 transition-colors cursor-pointer bg-white">
                <input
                  type="file"
                  id="documents"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="documents"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <img src={ICONS.upload} alt="" />
                  <p className="text-neutral-90 font-bold mt-2">Browse File</p>
                  <p className="text-neutral-60 text-xs mt-2">
                    Supported formats: PNG, JPG, JPEG, PDF <br /> Max size: 5MB
                  </p>
                </label>
              </div>
            )}

            {documentError && (
              <span className="text-red-500 text-sm">{documentError}</span>
            )}

            {/* Document List with Cross Icon */}
            {documents.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-neutral-10/10 px-3 py-1.5 rounded-full text-sm"
                  >
                    <span className="text-neutral-90">{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
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
            label="Submit"
            className="w-full mt-3"
            type="submit"
            isDisabled={!agreeToTerms || documents.length === 0}
          />
        </form>
      </div>

      <div className="w-[40%]">
        <SellerInstructions />
      </div>

      <Modal isModalOpen={isSuccess} setIsModalOpen={setIsSuccess}>
        <div className="flex flex-col items-center text-center py-10">
          <img src={IMAGES.successTick} alt="" />
          <h2 className="text-neutral-90 text-2xl font-bold mt-6">
            Vendor Request Submitted
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2">
            Your application is under admin review.You will be notified once
            approved.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default BecomeAVendor;
