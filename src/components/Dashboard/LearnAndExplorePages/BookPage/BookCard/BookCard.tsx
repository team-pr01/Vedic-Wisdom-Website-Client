import { Link } from "react-router-dom";
import { IMAGES } from "../../../../../assets";

const BookCard = () => {
  return (
    <Link to={`/dashboard/learn-and-explore/book/${1}`} className="rounded-2xl">
      <img
        src={IMAGES.dummyBook}
        alt=""
        className="rounded-2xl h-56 object-cover"
      />
      <h4 className="text-neutral-90 font-semibold mt-3">Atharvaveda</h4>
      <p className="text-neutral-50 text-sm font-medium">Veda</p>
    </Link>
  );
};

export default BookCard;
