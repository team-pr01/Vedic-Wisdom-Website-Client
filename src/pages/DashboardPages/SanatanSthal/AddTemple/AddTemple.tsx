/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import SelectDropdown from "../../../../components/Reusable/SelectDropdown/SelectDropdown";
import { ICONS } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";

// --- TYPES & INTERFACES ---
export interface TBasicInfo {
  templeName: string;
  mainDeity: string;
  description: string;
}

export interface TSocialMedia {
  facebook?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

export interface TLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  area?: string;
  googleMapUrl?: string;
}

export interface TOtherInfo {
  establishedYear?: number;
  visitingHours?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}

export interface TMedia {
  imageUrls?: string[];
  videoUrls?: string[];
}

export interface TFormData {
  basicInfo: TBasicInfo;
  socialMedia?: TSocialMedia;
  location: TLocation;
  otherInfo?: TOtherInfo;
  media?: TMedia;
  category: string;
}

const categoryOptions = [
  { label: "Ganesh Temple", value: "ganesh" },
  { label: "Durga Temple", value: "durga" },
  { label: "Shiva Temple", value: "shiva" },
  { label: "Vishnu Temple", value: "vishnu" },
  { label: "Krishna Temple", value: "krishna" },
  { label: "Hanuman Temple", value: "hanuman" },
  { label: "Ashram", value: "ashram" },
  { label: "Gurudwara", value: "gurudwara" },
  { label: "Other", value: "other" },
];

const AddTemple = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    getValues,
  } = useForm<TFormData>({
    // CRITICAL: shouldUnregister: false ensures data persists when components unmount
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      basicInfo: { templeName: "", mainDeity: "", description: "" },
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        area: "",
        googleMapUrl: "",
      },
      otherInfo: { visitingHours: "", phoneNumber: "", email: "", website: "" },
      socialMedia: { facebook: "", youtube: "", instagram: "", linkedin: "" },
      category: "",
    },
  });

  const totalSteps = 5;
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Location" },
    { number: 3, label: "Other Info" },
    { number: 4, label: "Social Media" },
    { number: 5, label: "Media" },
  ];

  // --- HANDLERS ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      const fileUrls = files.map((file) => URL.createObjectURL(file));
      const currentUrls = getValues("media.imageUrls") || [];
      setValue("media.imageUrls", [...currentUrls, ...fileUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    const currentUrls = getValues("media.imageUrls") || [];
    setValue(
      "media.imageUrls",
      currentUrls.filter((_, i) => i !== index),
    );
  };

  const addVideoUrl = () => {
    if (newVideoUrl.trim()) {
      const updatedVideos = [...videoUrls, newVideoUrl.trim()];
      setVideoUrls(updatedVideos);
      setValue("media.videoUrls", updatedVideos);
      setNewVideoUrl("");
    }
  };

  const removeVideoUrl = (index: number) => {
    const updatedVideos = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(updatedVideos);
    setValue("media.videoUrls", updatedVideos);
  };

  const nextStep = async () => {
    const fieldsToValidate: any = {
      1: [
        "basicInfo.templeName",
        "basicInfo.mainDeity",
        "basicInfo.description",
        "category",
      ],
      2: [
        "location.address",
        "location.city",
        "location.state",
        "location.country",
      ],
    };

    const isValid = fieldsToValidate[currentStep]
      ? await trigger(fieldsToValidate[currentStep])
      : true;

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data: TFormData) => {
    console.log("Final Form Submission Data:", data);
  };

  return (
    <div className="font-Manrope">
      <DashboardHeading
        title="Add New Temple"
        description="Fill in the details to add a new Sanatan Sthal to our directory."
      />

      {/* Progress Steps Indicator */}
      <div className="mt-8 mb-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= step.number
                      ? "bg-primary-10 text-white"
                      : "bg-neutral-30 text-neutral-60"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${currentStep >= step.number ? "text-primary-10" : "text-neutral-60"}`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${currentStep > step.number ? "bg-primary-10" : "bg-neutral-60/50"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 
            TECHNIQUE: We render all sections but hide the ones that are not current.
            This prevents DOM unmounting and guarantees zero data loss.
        */}

        {/* STEP 1: BASIC INFO */}
        <div className={currentStep !== 1 ? "hidden" : ""}>
          <section className="bg-white border border-neutral-55 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-neutral-90 mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Temple Name"
                placeholder="Enter temple name"
                error={errors.basicInfo?.templeName}
                {...register("basicInfo.templeName", { required: "Required" })}
              />
              <TextInput
                label="Main Deity"
                placeholder="Enter main deity"
                error={errors.basicInfo?.mainDeity}
                {...register("basicInfo.mainDeity", { required: "Required" })}
              />
              <div className="md:col-span-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-10 text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe significance..."
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-primary-10 transition bg-white resize-none ${errors.basicInfo?.description ? "border-red-500" : "border-neutral-55"}`}
                    rows={4}
                    {...register("basicInfo.description", {
                      required: "Required",
                      minLength: 20,
                    })}
                  />
                  {errors.basicInfo?.description && (
                    <span className="text-red-500 text-sm">
                      {errors.basicInfo.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <SelectDropdown
                  label="Category"
                  error={errors.category}
                  {...register("category", { required: "Required" })}
                  options={categoryOptions}
                />
              </div>
            </div>
          </section>
        </div>

        {/* STEP 2: LOCATION */}
        <div className={currentStep !== 2 ? "hidden" : ""}>
          <section className="bg-white border border-neutral-55 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-neutral-90 mb-6">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Address"
                placeholder="Enter full address"
                {...register("location.address", { required: "Required" })}
                error={errors.location?.address}
              />
              <TextInput
                label="City"
                placeholder="Enter city"
                {...register("location.city", { required: "Required" })}
                error={errors.location?.city}
              />
              <TextInput
                label="State"
                placeholder="Enter state/province"
                {...register("location.state", { required: "Required" })}
                error={errors.location?.state}
              />
              <TextInput
                label="Country"
                placeholder="Enter country"
                {...register("location.country", { required: "Required" })}
                error={errors.location?.country}
              />
              <TextInput
                label="Area (Optional)"
                placeholder="Enter area or locality"
                {...register("location.area")}
                isRequired={false}
              />
              <TextInput
                label="Google Maps URL"
                placeholder="Enter Google Maps link"
                {...register("location.googleMapUrl")}
                isRequired={false}
              />
            </div>
          </section>
        </div>

        {/* STEP 3: OTHER INFO */}
        <div className={currentStep !== 3 ? "hidden" : ""}>
          <section className="bg-white border border-neutral-55 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-neutral-90 mb-6">
              Other Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Established Year"
                type="number"
                placeholder="e.g., 1577"
                {...register("otherInfo.establishedYear")}
              />
              <TextInput
                label="Visiting Hours"
                placeholder="e.g., 6:00 AM - 9:00 PM"
                {...register("otherInfo.visitingHours")}
              />
              <TextInput
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                {...register("otherInfo.phoneNumber")}
              />
              <TextInput
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                {...register("otherInfo.email")}
                isRequired={false}
              />
              <TextInput
                label="Website"
                placeholder="Enter website URL"
                {...register("otherInfo.website")}
                isRequired={false}
              />
            </div>
          </section>
        </div>

        {/* STEP 4: SOCIAL MEDIA */}
        <div className={currentStep !== 4 ? "hidden" : ""}>
          <section className="bg-white border border-neutral-55 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-neutral-90 mb-6">
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Facebook"
                placeholder="Enter Facebook URL"
                {...register("socialMedia.facebook")}
                isRequired={false}
              />
              <TextInput
                label="YouTube"
                placeholder="Enter YouTube URL"
                {...register("socialMedia.youtube")}
                isRequired={false}
              />
              <TextInput
                label="Instagram"
                placeholder="Enter Instagram URL"
                {...register("socialMedia.instagram")}
                isRequired={false}
              />
              <TextInput
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
                {...register("socialMedia.linkedin")}
                isRequired={false}
              />
            </div>
          </section>
        </div>

        {/* STEP 5: MEDIA */}
        <div className={currentStep !== 5 ? "hidden" : ""}>
          <section className="bg-white border border-neutral-55 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-neutral-90 mb-6">Media</h2>
            <div className="mb-6">
              <label className="text-neutral-10 text-sm font-medium block mb-2">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-neutral-55 rounded-lg p-6 text-center hover:border-primary-10 transition cursor-pointer bg-neutral-10/5">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <img src={ICONS.upload} alt="upload" />
                  <p className="text-neutral-90 font-bold mt-2">Browse Files</p>
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-20 h-20 object-cover rounded-lg border"
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-neutral-10 text-sm font-medium block mb-2">
                Video URLs
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-neutral-55"
                  placeholder="Enter YouTube URL"
                />
                <button
                  type="button"
                  onClick={addVideoUrl}
                  className="px-4 py-3 bg-primary-10 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {videoUrls.map((url, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-neutral-10/10 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm truncate max-w-xs">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeVideoUrl(i)}
                      className="text-red-500"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            type="button"
            label="Previous"
            variant="secondary"
            onClick={prevStep}
            className={`px-8 ${currentStep === 1 ? "invisible" : ""}`}
            leftIcon={ICONS.arrowLeft}
          />
          <div className="flex gap-4">
            {currentStep === totalSteps ? (
              <Button
                type="submit"
                label="Add Temple"
                className="px-8"
                rightIcon={ICONS.arrowRight}
              />
            ) : (
              <Button
                type="button"
                label="Next"
                className="px-8"
                onClick={nextStep}
                rightIcon={ICONS.arrowRight}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTemple;
