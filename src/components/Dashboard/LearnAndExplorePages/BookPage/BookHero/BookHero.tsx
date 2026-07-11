import { FiBookOpen } from "react-icons/fi";
import { ICONS, IMAGES } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";

const BookHero = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden font-Manrope">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={IMAGES.bookHeroImg}
          alt="Books Banner"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24 max-w-2xl">
        {/* Badge */}
        <div className="bg-primary-10/20 backdrop-blur-sm border border-primary-10/30 rounded-full px-4 py-1.5 mb-4 text-primary-50 flex items-center gap-2 w-fit">
          <FiBookOpen className="mt-1"/> Vedic Library
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Explore Ancient
          <br />
          <span className="text-primary-10">Vedic Wisdom</span>
        </h1>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base mt-4 max-w-lg leading-relaxed">
          Dive into the timeless knowledge of Sanatan traditions. Discover sacred
          texts, spiritual guides, and wisdom that have shaped civilizations for
          thousands of years.
        </p>

        {/* Explore Button */}
        <Button
          label="Explore Books"
          className="mt-6"
          rightIcon={ICONS.arrowRight}
          onClick={() => console.log("Explore books clicked")}
        />
      </div>
    </div>
  );
};

export default BookHero;