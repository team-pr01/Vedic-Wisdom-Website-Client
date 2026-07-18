const TempleVideos = ({ videos }: { videos: string[] }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-90 mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos &&
          videos?.map((url, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 aspect-video"
            >
              <iframe
                className="w-full h-full"
                src={url}
                title={`Temple Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TempleVideos;
