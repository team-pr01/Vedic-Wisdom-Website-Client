import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import AyurvedaCard from "../../../components/Dashboard/AyurvedaPage/AyurvedaCard/AyurvedaCard";

const Ayurveda = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const foodCategories = ["All", "Sattvic", "Prasad", "Veg", "Non-veg"];
  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Ayurveda"
          description="Discover the art of Ayurveda to balance your mind, body and soul."
        />
        <div className="flex items-center gap-3">
          {foodCategories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-3xl border border-primary-80  hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
                selectedCategory === category
                  ? "bg-primary-10 text-white"
                  : "bg-white text-neutral-40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10">
        <AyurvedaCard/>
        <AyurvedaCard/>
        <AyurvedaCard/>
        <AyurvedaCard/>
      </div>
    </div>
  );
};

export default Ayurveda;
