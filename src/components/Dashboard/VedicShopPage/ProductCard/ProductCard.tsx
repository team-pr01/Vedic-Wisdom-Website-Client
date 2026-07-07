import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../assets";

const ProductCard = () => {
  return (
    <Link to={`/dashboard/vedic-shop/${1}`} className="space-y-2 font-Manrope">
      <img
        src={IMAGES.dummyProduct}
        alt=""
        className="rounded-lg w-full h-50 object-cover"
      />
      <h4 className="text-neutral-90 font-bold">Bhagavad Gita ( Hard copy)</h4>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
          <img src={ICONS.star} alt="" />
          <p className="text-neutral-50 text-sm">4.9/5</p>
        </div>
        <p className="text-neutral-50 text-sm">40 sold</p>
      </div>

      <h4 className="text-neutral-90 font-bold">
        $18.00{" "}
        <span className="text-xs line-through font-medium text-accent-30">
          $21.00
        </span>
      </h4>
    </Link>
  );
};

export default ProductCard;
