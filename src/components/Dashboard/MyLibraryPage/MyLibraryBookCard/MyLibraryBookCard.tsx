import React from "react";
import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import type { TAudioBook } from "../../../../types/audioBook.type";
import { IMAGES } from "../../../../assets";

interface MyLibraryBookCardProps {
  book: TAudioBook;
}

const MyLibraryBookCard: React.FC<MyLibraryBookCardProps> = ({ book }) => {
  return (
    <Link
      to={`/dashboard/learn-and-explore/audio-book/${book?._id}`}
      className="group block"
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={book?.thumbnailUrl || IMAGES.imagePlaceholder}
          alt={book?.name || "Audio Book"}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Premium Badge - Shows coins spent */}
        {book?.isPremium && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <FaCoins className="text-yellow-400 text-xs" />
            <span>{book?.coinPrice || 0} coins</span>
          </div>
        )}

        {/* Purchased Badge */}
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
          <span>✓</span>
          {book?.coinPrice || 0} coins
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-neutral-90 font-semibold group-hover:text-primary-10 transition-colors line-clamp-1">
              {book?.name}
            </h4>
            <p className="text-neutral-50 text-sm capitalize">
              {book?.category}
            </p>
          </div>
          {/* Coins spent badge */}
          {book?.isPremium && (
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 ml-2 shrink-0">
              <FaCoins className="text-amber-500 text-[10px]" />
              <span className="text-xs font-medium text-amber-700">
                {book?.coinPrice || 0}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MyLibraryBookCard;
