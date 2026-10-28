import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import type { TProduct } from "../../../../types/product.type";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div>
      <Link
        to={`/dashboard/vedic-shop/${product?._id}`}
        className="space-y-2 font-Manrope relative"
      >
        <img
          src={product?.imageUrls[0]}
          alt=""
          className="rounded-lg w-full h-50 object-cover"
        />
        <h4 className="text-neutral-90 font-bold">{product?.name}</h4>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img src={ICONS.star} alt="" />
            <p className="text-neutral-50 text-sm">{product?.rating}/5</p>
          </div>
          <div className="bg-neutral-50 size-1 rounded-full" />
          <p className="text-neutral-50 text-sm">{product?.soldCount} sold</p>
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
      <div className="flex items-center gap-2 justify-between mt-4">
        <Link
          to={`/dashboard/vedic-shop/vendor/product/edit/${product?._id}`}
          className="flex items-center justify-center gap-2 text-primary-10 text-sm bg-white border border-neutral-60/30 rounded-lg px-4 py-2 w-1/2"
        >
          <GoPencil />
          Edit
        </Link>
        <button className="flex items-center justify-center gap-2 text-red-600 text-sm bg-white border border-red-500 rounded-lg px-4 py-2 w-1/2">
          <RiDeleteBin6Line />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
