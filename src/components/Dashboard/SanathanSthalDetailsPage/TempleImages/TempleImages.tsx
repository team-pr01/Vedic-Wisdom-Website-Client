/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

const TempleImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    (images && images[0]) || "",
  );

  useEffect(() => {
    setSelectedImage((images && images[0]) || "");
  }, [images]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  if (!images || images.length === 0) {
    return (
      <div className="lg:w-2/3">
        <div className="rounded-xl overflow-hidden shadow-lg mb-4 bg-neutral-20 h-125 flex items-center justify-center">
          <p className="text-neutral-40">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-2/3">
      {/* Main Image */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src={selectedImage}
          alt="Temple"
          className="w-full h-125 object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary-10/30">
        {images?.map((img, index) => (
          <div
            key={index}
            className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedImage === img
                ? "border-primary-10 shadow-md"
                : "border-transparent hover:border-primary-10/50"
            }`}
            onClick={() => handleThumbnailClick(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleImages;
