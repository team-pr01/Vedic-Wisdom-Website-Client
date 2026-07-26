/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../../assets";
import type { TAudioBook } from "../../../../../types/audioBook.type";
import {
  useGetMySavedItemsQuery,
  useSaveItemMutation,
  useUnSaveItemMutation,
} from "../../../../../redux/Features/SavedItem/savedItemApi";
import { FaHeart, FaRegHeart, FaCoins } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AudioBookCard = ({
  book,
  direction = "col",
}: {
  book: TAudioBook;
  direction?: "row" | "col";
}) => {
  const isRow = direction === "row";

  const [saveItem] = useSaveItemMutation();
  const [unSaveItem] = useUnSaveItemMutation();
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch } = useGetMySavedItemsQuery({});
  const savedItems = data?.data?.savedItems || [];

  // Check if this audio book is saved
  const isSaved = savedItems?.some((item: any) => item?.itemId === book?._id);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isSaved) {
        const response = await unSaveItem({
          itemId: book?._id,
          itemType: "audioBook",
        }).unwrap();
        if (response?.success) {
          refetch();
        }
      } else {
        const response = await saveItem({
          itemType: "audioBook",
          itemId: book?._id,
        }).unwrap();
        if (response?.success) {
          refetch();
        }
      }
    } catch (error: any) {
      console.error("Error toggling save:", error);
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`rounded relative ${isRow ? "border border-neutral-55" : ""} group`}
    >
      {/* Premium/Free Badge */}
      {book?.isPremium ? (
        <>
          <div className="absolute top-1 left-px z-10">
            <img src={ICONS.premiumCircle} alt="Premium" />
          </div>
          {/* Coin Price Badge - Bottom Left */}
          {direction === "row" && (
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px]">
              <FaCoins className="text-yellow-400 text-xs" />
              <span>{book?.coinPrice || 0} coins</span>
            </div>
          )}
        </>
      ) : (
        <div className="bg-green-500 text-white px-1.5 py-px text-sm rounded-tl rounded-br absolute top-0 left-0 z-10">
          Free
        </div>
      )}

      {/* Save/Unsave Heart Button - Positioned top right */}
      <button
        onClick={handleSaveToggle}
        disabled={isLoading}
        className={`absolute top-2 right-2 z-20 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
        aria-label={isSaved ? "Unsave audio book" : "Save audio book"}
      >
        {isSaved ? (
          <FaHeart className="text-primary-10 text-sm" />
        ) : (
          <FaRegHeart className="text-neutral-60 text-sm hover:text-red-400 transition-colors" />
        )}
      </button>

      <Link to={`/dashboard/learn-and-explore/audio-book/${book?._id}`}>
        <div className={`${isRow ? "flex" : "flex flex-col"} gap-2`}>
          <img
            src={book?.thumbnailUrl || IMAGES.imagePlaceholder}
            alt={book?.name || "Audio Book"}
            className={`object-cover ${
              isRow ? "w-38 h-30 rounded-l" : "w-full h-47 rounded-md"
            } group-hover:scale-105 transition-transform duration-300`}
          />
          <div
            className={`${isRow ? "py-2 px-1" : "p-0"} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-neutral-90 font-bold group-hover:text-primary-10 transition-colors">
                  {book?.name}
                </h4>
                {book?.isPremium && direction === "col" && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <FaCoins className="inline text-amber-500 mr-1 text-[10px]" />
                    {book?.coinPrice || 0}
                  </span>
                )}
              </div>
              <p className="text-neutral-50 text-sm capitalize">
                {book?.category}
              </p>
              
            </div>
            {isRow && (
              <p className="text-neutral-50 text-sm">
                {book?.description?.slice(0, 40).concat("... ...")}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AudioBookCard;
