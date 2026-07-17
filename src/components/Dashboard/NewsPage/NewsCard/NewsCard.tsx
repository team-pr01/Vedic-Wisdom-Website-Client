import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { ICONS } from "../../../../assets";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { useToggleLikeNewsMutation } from "../../../../redux/Features/News/newsApi";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";
import { useState } from "react";
import type { TNews } from "../../../../types/news.type";

const NewsCard = ({ news }: { news: TNews }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [toggleLikeNews] = useToggleLikeNewsMutation();
  const [isLiked, setIsLiked] = useState(
    news?.likedBy?.some((id: string) => id === user?._id) || false,
  );
  const [likesCount, setLikesCount] = useState(news?.likes || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show toast message
      console.log("Please login to like");
      return;
    }

    // Optimistic update - immediate UI feedback
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!isLiked);
    setLikesCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);

    try {
      const response = await toggleLikeNews(news?._id).unwrap();

      if (!response?.success) {
        // Revert if API fails
        setIsLiked(previousIsLiked);
        setLikesCount(previousLikesCount);
        console.error("Failed to toggle like:", response);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-primary-80 rounded-xl">
      <img
        src={news?.imageUrl}
        alt=""
        className="w-full rounded-t-xl h-100 object-cover"
      />
      <div className="p-5">
        <h4 className="text-neutral-90 font-bold text-xl">{news?.title}</h4>
        <p className="text-neutral-10 text-sm 3xl:text-base mt-1">
          {news?.overview}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.calendar} alt="" />
              <p className="text-neutral-90 text-sm">
                {formatDate(news?.createdAt)}
              </p>
            </div>

            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-sm w-fit">
              {news?.category}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={isLoading}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isLiked ? (
                <IoHeart className="text-xl text-primary-10" />
              ) : (
                <IoHeartOutline className="text-xl text-primary-10" />
              )}
              <p className="text-neutral-90 text-sm">{likesCount}</p>
            </button>
            <Link
              to={`/dashboard/news/${news?._id}`}
              className="flex items-center gap-1.5"
            >
              <p className="text-neutral-5 text-sm font-semibold">Read More</p>
              <img src={ICONS.arrowRight} alt="" className="w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
