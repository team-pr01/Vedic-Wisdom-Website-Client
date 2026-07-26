/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearchOutline } from "react-icons/io5";
import { useGetMyPurchasedAudioBooksQuery } from "../../../../redux/Features/AudioBook/audioBookPurchaseApi";
import { useState } from "react";
import AudioBookCardSkeleton from "../../../../components/SkeletonLoaders/AudioBookCardSkeleton/AudioBookCardSkeleton";
import MyLibraryBookCard from "../../../../components/Dashboard/MyLibraryPage/MyLibraryBookCard/MyLibraryBookCard";

const MyLibrary = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading, isFetching } = useGetMyPurchasedAudioBooksQuery({
    keyword,
  });
  const myPurchasedAudioBooks = data?.data?.purchases || [];
  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          My Library
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
        {isLoading || isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <AudioBookCardSkeleton key={`other-${index}`} />
          ))
        ) : myPurchasedAudioBooks.length > 0 ? (
          myPurchasedAudioBooks?.map((audioBook: any) => (
            <MyLibraryBookCard
              key={audioBook?._id}
              book={audioBook?.audioBookId}
            />
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

export default MyLibrary;
