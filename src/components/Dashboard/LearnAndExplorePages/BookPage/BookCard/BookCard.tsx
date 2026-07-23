import { Link } from "react-router-dom";
import { IMAGES } from "../../../../../assets";
import type { TBooks } from "../../../../../types/books.type";

const BookCard = ({ book }: { book: TBooks }) => {
  return (
    <Link
      to={`/dashboard/learn-and-explore/book/${book?._id}`}
      className="rounded-2xl"
    >
      <img
        src={book?.imageUrl || IMAGES.imagePlaceholder}
        alt=""
        className="rounded-2xl h-56 object-cover"
      />
      <h4 className="text-neutral-90 font-semibold mt-3">{book?.name}</h4>
      <p className="text-neutral-50 text-sm font-medium">{book?.type}</p>
    </Link>
  );
};

export default BookCard;
