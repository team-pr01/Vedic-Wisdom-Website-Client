import { useState } from "react";
import { useGetAllAudioBooksQuery } from "../../../../../redux/Features/AudioBook/audioBookApi";
import type { TAudioBook } from "../../../../../types/audioBook.type";
import AudioBookCardSkeleton from "../../../../SkeletonLoaders/AudioBookCardSkeleton/AudioBookCardSkeleton";
import AudioBookCard from "../AudioBookCard/AudioBookCard";
import { IoSearchOutline } from "react-icons/io5";

const PeopleAlsoLike = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data: otherBooks,
    isLoading: isOtherAudioBookLoading,
    isFetching,
  } = useGetAllAudioBooksQuery({ keyword });

  const otherAudioBooks = otherBooks?.data?.audioBooks || [];

  const otherSkeletonCount = 6;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          People Also Like
        </h4>
        <div className="relative w-full sm:w-80 lg:w-100">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="e.g. Bhagavad Gita"
            value={keyword}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-3">
        {isOtherAudioBookLoading || isFetching ? (
          Array.from({ length: otherSkeletonCount }).map((_, index) => (
            <AudioBookCardSkeleton key={`other-${index}`} />
          ))
        ) : otherAudioBooks.length > 0 ? (
          otherAudioBooks?.map((audioBook: TAudioBook) => (
            <AudioBookCard key={audioBook?._id} book={audioBook} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-neutral-40">No audio books found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleAlsoLike;
