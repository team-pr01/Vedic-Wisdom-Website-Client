import { useRef, useEffect } from "react";
import { ICONS } from "../../../../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useGetNewArrivalAudioBooksQuery } from "../../../../../redux/Features/AudioBook/audioBookApi";
import AudioBookCardSkeleton from "../../../../SkeletonLoaders/AudioBookCardSkeleton/AudioBookCardSkeleton";
import type { TAudioBook } from "../../../../../types/audioBook.type";
import AudioBookCard from "../AudioBookCard/AudioBookCard";

const NewArrivals = () => {
  const { data: newArrivalBooks, isLoading: isNewArrivalLoading } =
    useGetNewArrivalAudioBooksQuery({});
  const newArrivalAudioBooks = newArrivalBooks?.data?.audioBooks || [];
  const swiperRef = useRef<SwiperType | null>(null);
  const newArrivalSkeletonCount = 4;

  // Update navigation on render
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [newArrivalAudioBooks]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          New Arrivals
        </h4>
        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          {/* Previous */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
          >
            <img
              src={ICONS.arrowRight}
              alt="Previous"
              className="size-4 rotate-180"
            />
          </button>

          {/* Next */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
          >
            <img src={ICONS.arrowRight} alt="Next" className="size-4" />
          </button>
        </div>
      </div>

      {isNewArrivalLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {Array.from({ length: newArrivalSkeletonCount }).map((_, index) => (
            <AudioBookCardSkeleton key={`new-${index}`} direction="row" />
          ))}
        </div>
      ) : (
        <div className="w-full relative mt-3">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
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
                slidesPerView: 4.4,
                spaceBetween: 20,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="overflow-visible!"
          >
            {newArrivalAudioBooks?.map((audioBook: TAudioBook) => (
              <SwiperSlide key={audioBook?._id}>
                <AudioBookCard book={audioBook} direction="row" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;