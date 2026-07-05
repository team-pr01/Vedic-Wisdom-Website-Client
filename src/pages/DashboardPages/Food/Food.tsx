import { useState } from "react";
import { ICONS } from "../../../assets";
import AiRecipeGeneratorBanner from "../../../components/Dashboard/FoodPage/AiRecipeGeneratorBanner/AiRecipeGeneratorBanner";
import FoodCard from "../../../components/Dashboard/FoodPage/FoodCard/FoodCard";
import Button from "../../../components/Reusable/Button/Button";

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const foodCategories = ["All", "Sattvic", "Prasad", "Veg", "Non-veg"];
  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-dashboard">Vedic Food & Recipes</h2>
          <p className="description mt-1">
            Discover the art of Sattvic cooking and nourishing prasad recipes to
            balance your mind, body and soul.
          </p>
        </div>
        <Button leftIcon={ICONS.ai} label="Cook With AI" />
      </div>

      <div className="mt-10">
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

        <div className="flex gap-10 mt-6">
          <div className="grid grid-cols-4 gap-4 w-[80%]">
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>

          <div className="w-[20%] sticky top-10 h-full">
            <AiRecipeGeneratorBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
