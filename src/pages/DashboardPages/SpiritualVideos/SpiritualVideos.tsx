import { useState, useEffect, useRef, useCallback } from "react";
import { FaHeart, FaComment, FaShare, FaBookmark, FaEllipsisV, FaPlayCircle } from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail: string;
  channelName: string;
  channelImage: string;
  views: number;
  likes: number;
  comments: number;
  uploadedAt: string;
  duration: string;
  category: string;
}

const SpiritualVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

  // Sample video data - In real app, fetch from API
  const generateSampleVideos = (pageNum: number): Video[] => {
    const categories = ["Spiritual", "Meditation", "Mantra", "Yoga", "Wisdom"];
    const titles = [
      "The Power of Meditation",
      "Gayatri Mantra Chanting",
      "Yoga for Inner Peace",
      "Bhagavad Gita Chapter 1",
      "Shiv Tandav Stotram",
      "Morning Mantra for Success",
      "Art of Mindfulness",
      "Vedic Wisdom Explained",
      "Soulful Bhajan",
      "Spiritual Healing",
    ];
    
    return Array.from({ length: 5 }, (_, i) => ({
      id: `video-${pageNum}-${i}`,
      title: titles[(pageNum + i) % titles.length] + ` (Part ${pageNum})`,
      youtubeUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
      thumbnail: `https://picsum.photos/seed/${pageNum + i}/400/225`,
      channelName: ["Spiritual Channel", "Vedic Wisdom", "Yoga Life", "Mantra World"][i % 4],
      channelImage: `https://picsum.photos/seed/channel${pageNum + i}/100/100`,
      views: Math.floor(Math.random() * 1000000),
      likes: Math.floor(Math.random() * 50000),
      comments: Math.floor(Math.random() * 5000),
      uploadedAt: `${Math.floor(Math.random() * 30)} days ago`,
      duration: `${Math.floor(Math.random() * 20) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      category: categories[(pageNum + i) % categories.length],
    }));
  };

  // Load initial videos
  useEffect(() => {
    setVideos(generateSampleVideos(1));
  }, []);

  // Load more videos
  const loadMoreVideos = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newVideos = generateSampleVideos(page + 1);
      setVideos(prev => [...prev, ...newVideos]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      // Stop loading more after 3 pages for demo
      if (page >= 3) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, loading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    if (lastVideoRef.current) {
      observerRef.current.observe(lastVideoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videos, hasMore, loading, loadMoreVideos]);

  const categories = ["All", "Spiritual", "Meditation", "Mantra", "Yoga", "Wisdom"];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="font-Manrope bg-neutral-10/5 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-neutral-20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-90 flex items-center gap-2">
                <FaPlayCircle className="text-primary-10" />
                Spiritual Videos
              </h1>
              <p className="text-sm text-neutral-60">Discover spiritual content</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-neutral-10/5 transition-colors">
                <FaHeart className="text-neutral-40" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary-10/30">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary-10 text-white"
                    : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={index === videos.length - 1 ? lastVideoRef : null}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-black/5">
              <iframe
                src={video.youtubeUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>

            {/* Video Info */}
            <div className="p-4">
              {/* Channel Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={video.channelImage}
                    alt={video.channelName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-neutral-90 hover:text-primary-10 cursor-pointer text-sm">
                      {video.channelName}
                    </h3>
                    <p className="text-xs text-neutral-60">
                      {formatNumber(video.views)} views • {video.uploadedAt}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-neutral-10/5 rounded-full transition-colors">
                  <FaEllipsisV className="text-neutral-40" />
                </button>
              </div>

              {/* Video Title */}
              <h4 className="text-base font-semibold text-neutral-90 mt-2 line-clamp-2">
                {video.title}
              </h4>

              {/* Categories */}
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-primary-10/10 text-primary-10 px-2 py-0.5 rounded-full">
                  {video.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-20">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-primary-10 transition-colors group">
                    <FaHeart className="group-hover:scale-110 transition-transform" />
                    <span>{formatNumber(video.likes)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-primary-10 transition-colors">
                    <FaComment />
                    <span>{formatNumber(video.comments)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-primary-10 transition-colors">
                    <FaShare />
                  </button>
                </div>
                <button className="text-sm text-neutral-60 hover:text-primary-10 transition-colors">
                  <FaBookmark />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-3 border-primary-10 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && videos.length > 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-neutral-60">✨ You've reached the end</p>
            <p className="text-xs text-neutral-40 mt-1">Come back for more spiritual content</p>
          </div>
        )}

        {/* Empty State */}
        {videos.length === 0 && !loading && (
          <div className="text-center py-16">
            <FaPlayCircle className="text-6xl text-neutral-30 mx-auto mb-4" />
            <p className="text-neutral-60 font-medium">No videos found</p>
            <p className="text-sm text-neutral-40 mt-1">Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpiritualVideos;