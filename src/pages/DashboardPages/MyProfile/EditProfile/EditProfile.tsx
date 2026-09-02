import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Button from "../../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";

type TEditProfileFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | undefined>("+1 234 567 890");
  const [countryCode, setCountryCode] = useState<string>("1");
  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://ui-avatars.com/api/?name=John+Doe&size=128&background=F2E4C9&color=785A00",
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<TEditProfileFormData>({
    defaultValues: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 234 567 890",
      countryCode: "1",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "United States",
      zipCode: "10001",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setValue("phoneNumber", value || "");

    if (value) {
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed) {
          const code = parsed.countryCallingCode;
          setCountryCode(code);
          setValue("countryCode", code);
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

  const onSubmit = async (data: TEditProfileFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Profile updated:", {
      ...data,
      countryCode,
      profileImage: imagePreview,
    });
    setIsLoading(false);
    navigate("/settings");
  };

  const handleCancel = () => {
    navigate("/settings");
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <DashboardHeading
          title="Edit Profile"
          description="Update your personal information"
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box font-Manrope rounded-4xl mt-8"
        >
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary-50 border-4 border-primary-30 overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaCamera className="w-12 h-12 text-primary-30" />
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-primary-30 text-white p-2.5 rounded-full cursor-pointer hover:bg-primary-10 transition-colors shadow-button"
              >
                <FaCamera className="w-4 h-4" />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-sm text-neutral-50 font-Manrope mt-3">
              Click the camera icon to change profile picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
              })}
            />

            {/* Email */}
            <TextInput
              label="Email Address"
              placeholder="Enter your email"
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

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-neutral-40 text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="US"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white ${
                  errors.phoneNumber ? "border-red-500" : "border-neutral-55"
                }`}
                placeholder="Enter phone number"
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Address */}
            <TextInput
              label="Address"
              placeholder="Enter your address"
              error={errors.address}
              {...register("address", {
                required: "Address is required",
              })}
            />

            {/* City */}
            <TextInput
              label="City"
              placeholder="Enter your city"
              error={errors.city}
              {...register("city", {
                required: "City is required",
              })}
            />

            {/* State */}
            <TextInput
              label="State"
              placeholder="Enter your state"
              error={errors.state}
              {...register("state", {
                required: "State is required",
              })}
            />

            {/* Country */}
            <TextInput
              label="Country"
              placeholder="Enter your country"
              error={errors.country}
              {...register("country", {
                required: "Country is required",
              })}
            />

            {/* Zip Code */}
            <TextInput
              label="Zip Code"
              placeholder="Enter your zip code"
              error={errors.zipCode}
              {...register("zipCode", {
                required: "Zip code is required",
                pattern: {
                  value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                  message: "Invalid zip code format",
                },
              })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              label="Cancel"
              type="button"
              onClick={handleCancel}
              variant="secondary"
            />
            <Button
              label="Save Changes"
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
