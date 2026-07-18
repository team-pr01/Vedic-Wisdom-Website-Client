import { useRef, useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ICONS } from "../../../assets";
import AvailableExperts from "../../../components/Reusable/AvailableExperts/AvailableExperts";
import VastuShastraVideoCard from "../../../components/Dashboard/VastuShastraPage/VastuShastraVideoCard/VastuShastraVideoCard";
import PopularVastuTips from "../../../components/Dashboard/VastuShastraPage/PopularVastuTips/PopularVastuTips";
import { useGetAllVastuQuery } from "../../../redux/Features/Vastu/vastuApi";
import type { TVastu } from "../../../types/vastu.type";
import { useCategories } from "../../../hooks/useCategories";
import CategoryFilter from "../../../components/Reusable/CategoryFilter/CategoryFilter";
import VastuShastraVideoCardSkeleton from "../../../components/SkeletonLoaders/VastuShastraVideoCardSkeleton/VastuShastraVideoCardSkeleton";

const VastuShastra = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { categories } = useCategories({
    areaName: "vastu",
  });

  const { data, isLoading } = useGetAllVastuQuery({
    category: selectedCategory,
  });
  const allVastu = data?.data?.vastu || [];
  return (
    <div className="font-Manrope space-y-8">
      <DashboardHeading
        title="Vastu Shastra"
        description="Create cosmic harmony in your physical environment."
      />

      <div className="flex items-center justify-between">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          {/* Previous */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 size-10 rounded-full flex items-center justify-center"
          >
            <img
              src={ICONS.arrowRight}
              alt="Previous"
              className="size-5 rotate-180"
            />
          </button>

          {/* Next */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 size-10 rounded-full flex items-center justify-center"
          >
            <img src={ICONS.arrowRight} alt="Next" className="size-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-5">
          {[1, 2, 3, 4]?.map((_, index) => (
            <VastuShastraVideoCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full mt-6 relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4.5}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4.3,
                spaceBetween: 30,
              },
            }}
          >
            {allVastu?.map((vastu: TVastu) => (
              <SwiperSlide key={vastu?._id}>
                <VastuShastraVideoCard vastu={vastu} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <PopularVastuTips />
      <AvailableExperts areaOfExpertise="vastu" />
    </div>
  );
};

export default VastuShastra;
