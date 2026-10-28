import { ICONS } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import ProductImageCarousel from "../../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../../redux/Features/Product/productApi";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data || {};
  const discountPercentage =
    ((product?.basePrice - product?.discountedPrice) / product?.basePrice) *
    100;

  if (isLoading) return <LogoLoader />;
  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard", isActive: true },
          {
            label: "Product Details",
            path: `/dashboard/vedic-shop/${id}`,
            isActive: true,
          },
        ]}
      />
      <div className="flex gap-10 mt-5">
        <div className="w-full lg:w-[40%]">
          <ProductImageCarousel images={product?.imageUrls} />
        </div>

        <div className="w-[60%]">
          <h4 className="text-neutral-90 font-bold text-2xl">
            {product?.name}
          </h4>

          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center gap-2">
              <img src={ICONS.star} alt="" />
              <p className="text-neutral-50 text-sm">{product?.rating}/5</p>
            </div>
            <p className="text-neutral-50 text-sm">{product?.soldCount} sold</p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <h4 className="text-neutral-90 text-2xl font-bold">
              {product?.priceCurrency}
              {product?.discountedPrice}{" "}
              <span className="text-sm line-through font-medium text-accent-30">
                {product?.priceCurrency}
                {product?.basePrice}
              </span>
            </h4>

            <div className="border border-neutral-83 bg-neutral-70 rounded-md px-2 py-1 text-primary-10 font-bold w-fit text-sm">
              -{discountPercentage.toFixed(0)}%
            </div>
          </div>

          <p className="text-neutral-10 font-semibold mt-4">
            About the product
          </p>
          <p className="text-neutral-50 mt-1">{product?.description}</p>

          <div className="flex items-center gap-3 mt-6">
            {/* <Button
              variant="secondary"
              leftIcon={ICONS.heart}
              label="Add to Wishlist"
              className="w-[30%]"
            /> */}
            <Button label="Buy Now" className="w-full" />
          </div>
        </div>
      </div>
      {/* 
      <h4 className="text-neutral-90 font-bold text-xl mt-16">
        Explore our other products
      </h4>
      <div className="grid grid-cols-5 gap-4 mt-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}
    </div>
  );
};

export default ProductDetails;
