import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../../../../redux/Features/Product/productApi";
import TextInput from "../../../../../../components/Reusable/TextInput/TextInput";
import SelectDropdownWithSearch from "../../../../../../components/Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import Button from "../../../../../../components/Reusable/Button/Button";
import { ICONS } from "../../../../../../assets";
import { useCategories } from "../../../../../../hooks/useCategories";
import RichTextField from "../../../../../Reusable/RichTextField/RichTextField";
import LogoLoader from "../../../../../Shared/LogoLoader/LogoLoader";

type TFormData = {
  name: string;
  category: string;
  description: string;
  priceCurrency: string;
  basePrice: number;
  discountedPrice?: number;
  rating?: number;
  soldCount?: number;
};

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 5;

const AddOrEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { data, isLoading: isProductLoading } = useGetSingleProductQuery(id!, {
    skip: !id,
  });
  const product = data?.data;

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState(!isEditMode);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
  } = useForm<TFormData>({
    defaultValues: {
      priceCurrency: "৳",
    },
  });

  // Watch category to pass it to the SelectDropdownWithSearch
  const selectedCategory = watch("category");

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const isLoading = isAdding || isUpdating;

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      priceCurrency: product.priceCurrency || "৳",
      basePrice: product.basePrice ?? 0,
      discountedPrice: product.discountedPrice ?? undefined,
      rating: product.rating ?? undefined,
      soldCount: product.soldCount ?? undefined,
    });

    setExistingImages(product.imageUrls || []);

    setIsDataLoaded(true);
  }, [product, reset]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const totalCount = existingImages.length + images.length + files.length;

    if (totalCount > MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const oversized = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
      setImageError(`${oversized.name} exceeds the ${MAX_SIZE_MB}MB limit`);
      return;
    }

    setImageError("");
    setImages([...images, ...files]);
  };

  const removeNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageError("");
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
    setImageError("");
  };

  const onSubmit = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("priceCurrency", data.priceCurrency);
      formData.append("basePrice", String(data.basePrice));

      if (data.discountedPrice !== undefined && data.discountedPrice !== null) {
        formData.append("discountedPrice", String(data.discountedPrice));
      }
      if (data.rating !== undefined && data.rating !== null) {
        formData.append("rating", String(data.rating));
      }
      if (data.soldCount !== undefined && data.soldCount !== null) {
        formData.append("soldCount", String(data.soldCount));
      }

      images.forEach((file) => {
        formData.append("files", file);
      });

      if (isEditMode) {
        existingImages.forEach((url) => {
          formData.append("existingImageUrls", url);
        });

        const response = await updateProduct({ id, data: formData }).unwrap();
        if (response?.success) {
          navigate("/dashboard/vedic-shop/vendor/dashboard")
        }
      } else {
        const response = await addProduct(formData).unwrap();
        if (response?.success) {
          reset();
          setImages([]);
          setExistingImages([]);
          setAgreeToTerms(false);
          navigate("/dashboard/vedic-shop/vendor/dashboard")
        }
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "add"} product:`,
        error
      );
    }
  };

  const { categories } = useCategories({ areaName: "product" });

  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }));

  const totalImages = existingImages.length + images.length;

  if (isProductLoading) return <LogoLoader />;

  return (
    <div className="font-Manrope">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          error={errors.name}
          {...register("name", {
            required: "Product name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />

        {/* Category */}
        <SelectDropdownWithSearch
          label="Category"
          name="category"
          options={categoryOptions}
          // Pass value here so it shows the default selected value in edit mode
          value={selectedCategory}
          onChange={(value) =>
            setValue("category", value, { shouldValidate: true })
          }
          isRequired={true}
          error={errors.category?.message}
        />

        <input
          type="hidden"
          {...register("category", { required: "Category is required" })}
        />

        {/* Description - key={id} forces re-mount if navigating from add to edit */}
        <RichTextField
    key={isDataLoaded ? "loaded" : "loading"} // <--- THIS IS THE TRICK
    control={control}
    name="description"
    label="Description"
    placeholder="Describe your product and its spiritual significance."
    error={errors.description}
  />

        {/* Price row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput
            label="Currency"
            placeholder="e.g. ৳, ₹, $"
            error={errors.priceCurrency}
            {...register("priceCurrency", { required: "Currency is required" })}
            isDisabled={true}
          />

          <TextInput
            label="Base Price"
            placeholder="e.g 1000"
            type="number"
            error={errors.basePrice}
            {...register("basePrice", {
              required: "Base price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be positive" },
            })}
          />

          <TextInput
            label="Discounted Price"
            placeholder="e.g 800"
            type="number"
            error={errors.discountedPrice}
            {...register("discountedPrice", {
              valueAsNumber: true,
              min: { value: 0, message: "Price must be positive" },
            })}
          />
        </div>

        {/* Rating + Sold Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Rating (0–5)"
            placeholder="e.g 4"
            type="number"
            error={errors.rating}
            {...register("rating", {
              valueAsNumber: true,
              min: { value: 0, message: "Min 0" },
              max: { value: 5, message: "Max 5" },
            })}
          />

          <TextInput
            label="Sold Count"
            placeholder="e.g 1000"
            type="number"
            error={errors.soldCount}
            {...register("soldCount", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be positive" },
            })}
          />
        </div>

        {/* Images */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-10 text-sm font-medium">
            Product Images <span className="text-red-500">*</span>
            <span className="text-neutral-40 text-xs font-normal ml-2">
              (Max {MAX_IMAGES} images)
            </span>
          </label>

          {totalImages < MAX_IMAGES && (
            <div className="border-2 border-dashed border-neutral-55 rounded-lg p-6 text-center hover:border-primary-10 transition-colors cursor-pointer bg-white">
              <input
                type="file"
                id="productImages"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="productImages"
                className="cursor-pointer flex flex-col items-center"
              >
                <img src={ICONS.upload} alt="" />
                <p className="text-neutral-90 font-bold mt-2">Browse Images</p>
                <p className="text-neutral-60 text-xs mt-2">
                  Supported formats: JPG, JPEG, PNG, WEBP · Max size:{" "}
                  {MAX_SIZE_MB}MB each
                </p>
              </label>
            </div>
          )}

          {imageError && (
            <span className="text-red-500 text-sm">{imageError}</span>
          )}

          {(existingImages.length > 0 || images.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {/* Existing images */}
              {existingImages.map((url, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative group rounded-lg overflow-hidden border border-neutral-55 bg-gray-50 aspect-3/2"
                >
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover" // Using object-cover with aspect ratio
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Saved
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* New images */}
              {images.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="relative group rounded-lg overflow-hidden border border-primary-10 bg-gray-50 aspect-3/2"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover" // Using object-cover with aspect ratio
                  />
                  <span className="absolute bottom-2 left-2 bg-primary-10 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2 mt-6">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="peer opacity-0 absolute w-5 h-5 cursor-pointer"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
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
          label={
            isLoading
              ? isEditMode
                ? "Updating Product..."
                : "Adding Product..."
              : isEditMode
              ? "Update Product"
              : "Add Product"
          }
          className="w-full mt-4"
          type="submit"
          isDisabled={!agreeToTerms || totalImages === 0 || isLoading}
        />
      </form>
    </div>
  );
};

export default AddOrEditProduct;