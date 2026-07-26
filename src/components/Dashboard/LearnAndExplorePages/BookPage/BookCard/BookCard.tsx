/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { IMAGES } from "../../../../../assets";
import type { TBooks } from "../../../../../types/books.type";
import {
  useGetMySavedItemsQuery,
  useSaveItemMutation,
  useUnSaveItemMutation,
} from "../../../../../redux/Features/SavedItem/savedItemApi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";

const BookCard = ({ book }: { book: TBooks }) => {
  const [saveItem] = useSaveItemMutation();
  const [unSaveItem] = useUnSaveItemMutation();
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch } = useGetMySavedItemsQuery({});
  const savedItems = data?.data?.savedItems || [];

  // Check if this book is saved
  const isSaved = savedItems?.some((item: any) => item?.itemId === book?._id);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isSaved) {
        // Unsave the book
        const response = await unSaveItem({
          itemId: book?._id,
          itemType: "book",
        }).unwrap();
        if (response?.success) {
          refetch();
        }
      } else {
        // Save the book
        const response = await saveItem({
          itemType: "book",
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
    <div className="rounded-2xl relative group">
      <Link
        to={`/dashboard/learn-and-explore/book/${book?._id}`}
        className="rounded-2xl block"
      >
        <div className="relative">
          <img
            src={book?.imageUrl || IMAGES.imagePlaceholder}
            alt={book?.name || "Book"}
            className="rounded-2xl h-56 w-full object-cover"
          />

          {/* Save/Unsave Heart Button */}
          <button
            onClick={handleSaveToggle}
            disabled={isLoading}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label={isSaved ? "Unsave book" : "Save book"}
          >
            {isSaved ? (
              <FaHeart className="text-primary-10 text-sm" />
            ) : (
              <FaRegHeart className="text-neutral-60 text-sm hover:text-red-400 transition-colors" />
            )}
          </button>
        </div>

        <h4 className="text-neutral-90 font-semibold mt-3 group-hover:text-primary-10 transition-colors">
          {book?.name}
        </h4>
        <p className="text-neutral-50 text-sm font-medium">{book?.type}</p>
      </Link>
    </div>
  );
};

export default BookCard;
