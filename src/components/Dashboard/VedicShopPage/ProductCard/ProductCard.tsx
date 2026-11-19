/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import type { TProduct } from "../../../../types/product.type";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteProductMutation } from "../../../../redux/Features/Product/productApi";
import { useState } from "react";
import ConfirmationModal from "../../../Reusable/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

const ProductCard = ({
  product,
  isVendor,
}: {
  product: TProduct;
  isVendor?: boolean;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(product._id).unwrap();
      if (response?.success) {
        setIsDeleteModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <Link
        to={`/dashboard/vedic-shop/${product?._id}`}
        className="space-y-2 font-Manrope relative block"
      >
        <img
          src={product?.imageUrls[0]}
          alt={product?.name}
          loading="lazy"
          className="rounded-lg w-full h-36 sm:h-44 lg:h-50 object-cover"
        />
        <h4 className="text-neutral-90 font-bold line-clamp-2">
          {product?.name}
        </h4>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <img src={ICONS.star} alt="rating" className="shrink-0" />
            <p className="text-neutral-50 text-sm whitespace-nowrap">
              {product?.rating}/5
            </p>
          </div>
          <div className="bg-neutral-50 size-1 rounded-full shrink-0" />
          <p className="text-neutral-50 text-sm whitespace-nowrap">
            {product?.soldCount} sold
          </p>
        </div>

        <h4 className="text-neutral-90 font-bold">
          {product?.priceCurrency}
          {product?.discountedPrice}{" "}
          <span className="text-xs line-through font-medium text-accent-30">
            {product?.priceCurrency}
            {product?.basePrice}
          </span>
        </h4>
      </Link>

      {isVendor && (
        <div className="flex items-center gap-2 justify-between mt-4">
          <Link
            to={`/dashboard/vedic-shop/vendor/product/edit/${product?._id}`}
            className="flex items-center justify-center gap-2 text-primary-10 text-sm bg-white border border-neutral-60/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-2 w-1/2"
          >
            <GoPencil className="shrink-0" />
            Edit
          </Link>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center justify-center gap-2 text-red-600 text-sm bg-white border border-red-500 rounded-lg px-3 sm:px-4 py-2.5 sm:py-2 w-1/2 hover:bg-red-50 transition-colors"
          >
            <RiDeleteBin6Line className="shrink-0" />
            Delete
          </button>
        </div>
      )}

      {isVendor && (
        <ConfirmationModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          title="Delete Product"
          description="Are you sure you want to delete this product? This action is irreversible."
          variant="danger"
          confirmButtonText="Yes, Delete"
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default ProductCard;