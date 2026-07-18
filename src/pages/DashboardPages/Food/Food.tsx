import { useState } from "react";
import { ICONS } from "../../../assets";
import AiRecipeGeneratorBanner from "../../../components/Dashboard/FoodPage/AiRecipeGeneratorBanner/AiRecipeGeneratorBanner";
import FoodCard from "../../../components/Dashboard/FoodPage/FoodCard/FoodCard";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useGetAllRecipesQuery } from "../../../redux/Features/Food/foodApi";
import type { TFood } from "../../../types/food.type";
import FoodCardSkeleton from "../../../components/SkeletonLoaders/FoodCardSkeleton/FoodCardSkeleton";
import { useCategories } from "../../../hooks/useCategories";
import CategoryFilter from "../../../components/Reusable/CategoryFilter/CategoryFilter";
import EmptyState from "../../../components/Reusable/EmptyState/EmptyState";

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data, isLoading } = useGetAllRecipesQuery({
    category: selectedCategory,
  });
  const allRecipes = data?.data?.foods || [];
  const { categories } = useCategories({
    areaName: "food",
  });
  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Vedic Food & Recipes"
          description="Discover the art of Sattvic cooking and nourishing prasad recipes to
            balance your mind, body and soul."
        />
        <Button leftIcon={ICONS.ai} label="Cook With AI" />
      </div>

      <div className="mt-10">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="flex gap-10 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <FoodCardSkeleton key={index} />
                ))
              : allRecipes?.map((recipe: TFood) => (
                  <FoodCard key={recipe._id} recipe={recipe} />
                ))}
          </div>

          <div className="w-[20%] sticky top-10 h-full">
            <AiRecipeGeneratorBanner />
          </div>
        </div>

        {!isLoading && allRecipes?.length === 0 && <EmptyState />}
      </div>
    </div>
  );
};

export default Food;
