/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";

import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Button from "../../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../../redux/Features/User/userApi";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";

type TEditProfileFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading: isProfileLoading } = useGetMeQuery({});

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [phone, setPhone] = useState<string | undefined>();
  const [countryCode, setCountryCode] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm<TEditProfileFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  // Setting default values
  useEffect(() => {
    const myProfile = data?.data || {};
    if (!myProfile) return;

    reset({
      fullName: myProfile.name || "",
      email: myProfile.email || "",
      phoneNumber: myProfile.phoneNumber || "",
      countryCode: myProfile.countryCode || "",
      address: myProfile.address || "",
      city: myProfile.city || "",
      state: myProfile.state || "",
      country: myProfile.country || "",
      pinCode: myProfile.pinCode || "",
    });

    // Construct the international number for PhoneInput.
    const callingCode = myProfile.countryCode
      ? `+${myProfile.countryCode.replace(/^\+/, "")}`
      : "";

    const phoneNumber = myProfile.phoneNumber || "";

    setCountryCode(myProfile.countryCode || "");

    setPhone(
      phoneNumber.startsWith("+")
        ? phoneNumber
        : phoneNumber
          ? `${callingCode} ${phoneNumber}`
          : undefined,
    );

    setImagePreview(
      myProfile.profilePicture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          myProfile.name || "User",
        )}&size=128&background=F2E4C9&color=785A00`,
    );
  }, [data?.data, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      e.target.value = "";
      return;
    }

    setProfilePicture(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setValue("phoneNumber", value || "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (value) {
      const parsed = parsePhoneNumber(value);

      if (parsed) {
        const code = parsed.countryCallingCode;

        setCountryCode(code);
        setValue("countryCode", code, {
          shouldDirty: true,
        });
      }
    } else {
      setCountryCode("");
      setValue("countryCode", "", {
        shouldDirty: true,
      });
    }

    if (value) {
      clearErrors("phoneNumber");
    }
  };

  const handleUpdateProfile = async (data: TEditProfileFormData) => {
    try {
      const formData = new FormData();

      // Map frontend field names to backend schema fields.
      formData.append("name", data.fullName.trim());
      formData.append("email", data.email.trim());
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("countryCode", countryCode);
      formData.append("address", data.address.trim());
      formData.append("city", data.city.trim());
      formData.append("state", data.state.trim());
      formData.append("country", data.country.trim());
      formData.append("pinCode", data.pinCode.trim());

      // Upload the actual image file, not the preview URL.
      if (profilePicture) {
        formData.append("file", profilePicture);
      }

      const response = await updateProfile(formData).unwrap();

      toast.success(response?.message || "Profile updated successfully.");

      navigate(-1);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Failed to update profile.";

      toast.error(message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isProfileLoading) {
    return <LogoLoader />;
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <DashboardHeading
          title="Edit Profile"
          description="Update your personal information"
        />

        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="p-8 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box font-Manrope rounded-4xl mt-8"
        >
          {/* Profile Picture */}
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

          {/* Other fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
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
              isDisabled={true}
            />

            {/* Phone */}
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
              />

              <input
                type="hidden"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
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

            {/* Pin/Zip Code: not present in the supplied backend schema */}
            <TextInput
              label="Pin/Zip Code"
              placeholder="Enter your pin/zip code"
              error={errors.pinCode}
              {...register("pinCode", {
                required: "Pin/Zip code is required",
              })}
            />
          </div>

          {/* Actions */}
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
