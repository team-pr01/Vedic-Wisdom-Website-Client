import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <div>
      <div className="h-64 md:h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-sm">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-dots",
          }}
          loop={true}
          className="w-full h-full"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Dots - Styled to match SS */}
      <div className="w-full flex justify-center mt-5">
        <div
          className="custom-dots !relative !left-0 !bottom-0 !w-fit flex items-center justify-center gap-1.5
    [&_.swiper-pagination-bullet]:!w-2
    [&_.swiper-pagination-bullet]:!h-[3px]
    [&_.swiper-pagination-bullet]:!rounded-full
    [&_.swiper-pagination-bullet]:!bg-[#D9D9D9]
    [&_.swiper-pagination-bullet]:!opacity-100
    [&_.swiper-pagination-bullet]:!mx-0
    [&_.swiper-pagination-bullet]:transition-all
    [&_.swiper-pagination-bullet]:duration-300
    [&_.swiper-pagination-bullet-active]:!w-8
    [&_.swiper-pagination-bullet-active]:!bg-[#D6A52B]"
        />
      </div>
    </div>
  );
};

export default ProductImageCarousel;
