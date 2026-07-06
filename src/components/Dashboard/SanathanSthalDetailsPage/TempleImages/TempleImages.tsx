import { IMAGES } from "../../../../assets";

const TempleImages = () => {
  return (
    <div className="lg:w-2/3">
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200"
          alt="Golden Temple Main"
          className="w-full h-125 object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[1, 2, 3, 4]?.map((img, index) => (
          <div
            key={index}
            className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-4 ${index === 0 ? "border-yellow-400" : "border-transparent"}`}
          >
            <img
              src={IMAGES.dummyProject}
              alt={`thumb-${index}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleImages;
