import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../../assets";
import type { TAudioBook } from "../../../../../types/audioBook.type";

const AudioBookCard = ({
  book,
  direction = "col",
}: {
  book: TAudioBook;
  direction?: "row" | "col";
}) => {
  const isRow = direction === "row";
  return (
    <Link
      to={`/dashboard/learn-and-explore/audio-book/${book?._id}`}
      className={`rounded relative ${isRow ? "border border-neutral-55" : ""}`}
    >
      {book?.isPremium ? (
        <div className="absolute top-1 left-px">
          <img src={ICONS.premiumCircle} alt="" />
        </div>
      ) : (
        <div className="bg-green-500 text-white px-1.5 py-px text-sm rounded-tl rounded-br absolute top-0 left-o">
          Free
        </div>
      )}

      <div className={`${isRow ? "flex" : " flex flex-col"} gap-2`}>
        <img
          src={book?.thumbnailUrl || IMAGES.imagePlaceholder}
          alt=""
          className={`object-cover ${isRow ? "w-38 h-30 rounded-l" : "w-full h-47 rounded-md"}`}
        />
        <div
          className={`${isRow ? "py-2 px-1" : "p-0"} flex flex-col justify-between`}
        >
          <div>
            <h4 className="text-neutral-90 font-bold">{book?.name}</h4>
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
  );
};

export default AudioBookCard;
