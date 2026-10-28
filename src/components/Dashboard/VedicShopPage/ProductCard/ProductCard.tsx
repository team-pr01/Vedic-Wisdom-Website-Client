import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import type { TProduct } from "../../../../types/product.type";


const ProductCard = ({product}:{product:TProduct}) => {
  return (
    <Link to={`/dashboard/vedic-shop/${product?._id}`} className="space-y-2 font-Manrope">
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
        <div className="bg-neutral-50 size-1 rounded-full"/>
        <p className="text-neutral-50 text-sm">{product?.soldCount} sold</p>
      </div>

      <h4 className="text-neutral-90 font-bold">
        {product?.priceCurrency}{product?.discountedPrice}{" "}
        <span className="text-xs line-through font-medium text-accent-30">
          {product?.priceCurrency}{product?.basePrice}
        </span>
      </h4>
    </Link>
  );
};

export default ProductCard;
