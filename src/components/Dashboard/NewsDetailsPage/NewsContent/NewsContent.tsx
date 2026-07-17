import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { ICONS } from "../../../../assets";
import type { TNews } from "../../../../types/news.type";
import { formatDate } from "../../../../utils/formatDate";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";
import { useToggleLikeNewsMutation } from "../../../../redux/Features/News/newsApi";
import { useState } from "react";

const NewsContent = ({ news }: { news: TNews }) => {
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

  const handleShare = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: news?.title || "Check this out!",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Share failed:", error);
    }
  }
};

  return (
    <div className="">
      <h4 className="text-neutral-90 font-bold text-2xl">{news?.title}</h4>

      <img
        src={news?.imageUrl}
        alt=""
        className="w-full rounded-xl h-100 object-cover mt-3"
      />

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
          <button onClick={handleShare} className="flex items-center gap-1">
            <img src={ICONS.share} alt="" />
          </button>
        </div>
      </div>

      <p className="text-neutral-10 text-sm 3xl:text-base mt-6">
        {news?.overview}
      </p>

      <div
        className="text-neutral-10 text-sm 3xl:text-base mt-6"
        dangerouslySetInnerHTML={{ __html: news?.content }}
      />
    </div>
  );
};

export default NewsContent;
