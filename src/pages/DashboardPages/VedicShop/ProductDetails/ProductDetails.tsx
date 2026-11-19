import { ICONS } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import ProductImageCarousel from "../../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";
import { useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useIncrementClickMutation,
} from "../../../../redux/Features/Product/productApi";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";
import DOMPurify from "dompurify";
import { descriptionSanitizeConfig } from "@amitdhoju/tiptap-ui";
import { useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const [incrementClick] = useIncrementClickMutation();

  useEffect(() => {
    if (!id) return;

    const viewedProducts = JSON.parse(
      sessionStorage.getItem("viewedProducts") || "[]",
    );

    if (!viewedProducts.includes(id)) {
      incrementClick(id)
        .unwrap()
        .catch((err) => {
          console.error("Failed to track click", err);
        });

      viewedProducts.push(id);
      sessionStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    }
  }, [id, incrementClick]);

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

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-4 lg:mt-5">
        {/* Product image carousel */}
        <div className="w-full lg:w-[40%]">
          <ProductImageCarousel images={product?.imageUrls} />
        </div>

        {/* Product info */}
        <div className="w-full lg:w-[60%]">
          <h4 className="text-neutral-90 font-bold text-xl sm:text-2xl break-words">
            {product?.name}
          </h4>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2">
            <div className="flex items-center gap-2">
              <img src={ICONS.star} alt="" className="shrink-0" />
              <p className="text-neutral-50 text-sm whitespace-nowrap">
                {product?.rating}/5
              </p>
            </div>
            <p className="text-neutral-50 text-sm whitespace-nowrap">
              {product?.soldCount} sold
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3 mt-3">
            <h4 className="text-neutral-90 text-xl sm:text-2xl font-bold break-words">
              {product?.priceCurrency}
              {product?.discountedPrice}{" "}
              <span className="text-sm line-through font-medium text-accent-30">
                {product?.priceCurrency}
                {product?.basePrice}
              </span>
            </h4>

            <div className="border border-primary-83 bg-neutral-70 rounded-md px-2 py-1 text-primary-10 font-bold w-fit text-xs sm:text-sm shrink-0">
              -{discountPercentage.toFixed(0)}%
            </div>
          </div>

          <p className="text-neutral-10 font-semibold mt-4">
            About the product
          </p>

          <div
            className="text-neutral-50 mt-1 text-sm sm:text-base
              [&>p]:mb-4 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-1
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol]:space-y-1
              [&>h1]:text-xl sm:[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-3 [&>h1]:mt-6
              [&>h2]:text-lg sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-5
              [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>h3]:mt-4
              [&>a]:text-primary-10 [&>a]:underline
              [&>strong]:font-bold [&>em]:italic"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                product.description,
                descriptionSanitizeConfig,
              ),
            }}
          />

          <a
            href={product?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mt-6 w-full sm:w-auto"
          >
            <Button label="Buy Now" className="w-full sm:w-auto sm:px-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;