import { ICONS, IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";
import ProductCard from "../../../components/Dashboard/VedicShopPage/ProductCard/ProductCard";
import ProductImageCarousel from "../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";

const ProductDetails = () => {
  const banners = [
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
  ];
  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard", isActive: true },
          {
            label: "Product Details",
            path: "/dashboard/vedic-shop/1",
            isActive: true,
          },
        ]}
      />
      <div className="flex gap-10 mt-5">
        <div className="w-full lg:w-[40%]">
          <ProductImageCarousel images={banners} />
        </div>

        <div className="w-[60%]">
          <h4 className="text-neutral-90 font-bold text-2xl">
            Bhagavad Gita ( Hard copy)
          </h4>

          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center gap-2">
              <img src={ICONS.star} alt="" />
              <p className="text-neutral-50 text-sm">4.9/5 (685 Reviews)</p>
            </div>
            <p className="text-neutral-50 text-sm">40 sold</p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <h4 className="text-neutral-90 text-2xl font-bold">
              $18.00{" "}
              <span className="text-sm line-through font-medium text-accent-30">
                $21.00
              </span>
            </h4>

            <div className="border border-neutral-83 bg-neutral-70 rounded-md px-2 py-1 text-primary-10 font-bold w-fit text-sm">
              -10%
            </div>
          </div>

          <p className="text-neutral-10 font-semibold mt-4">
            About the product
          </p>
          <p className="text-neutral-50 mt-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
            dolore excepturi mollitia officiis. Iste debitis natus provident
            perferendis tempora magnam, corporis ducimus! Aliquam natus illum,
            temporibus optio ea magnam odit sunt voluptates officia impedit
            molestias in asperiores, ipsa ex quaerat? Laudantium soluta
            excepturi dolores quam sunt labore iste autem voluptatum!
          </p>
          <p className="text-neutral-50 mt-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
            dolore excepturi mollitia officiis. Iste debitis natus provident
            perferendis tempora magnam, corporis ducimus! Aliquam natus illum,
            temporibus optio ea magnam odit sunt voluptates officia impedit
            molestias in asperiores, ipsa ex quaerat? Laudantium soluta
            excepturi dolores quam sunt labore iste autem voluptatum!
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="secondary"
              leftIcon={ICONS.heart}
              label="Add to Wishlist"
              className="w-[30%]"
            />
            <Button label="Buy Now" className="w-full" />
          </div>
        </div>
      </div>

      <h4 className="text-neutral-90 font-bold text-xl mt-16">
        Explore our other products
      </h4>
      <div className="grid grid-cols-5 gap-4 mt-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductDetails;
