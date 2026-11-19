import { useState } from "react";
import AiRecipeGeneratorBanner from "../../../components/Dashboard/FoodPage/AiRecipeGeneratorBanner/AiRecipeGeneratorBanner";
import FoodCard from "../../../components/Dashboard/FoodPage/FoodCard/FoodCard";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useGetAllRecipesQuery } from "../../../redux/Features/Food/foodApi";
import type { TFood } from "../../../types/food.type";
import FoodCardSkeleton from "../../../components/SkeletonLoaders/FoodCardSkeleton/FoodCardSkeleton";
import { useCategories } from "../../../hooks/useCategories";
import CategoryFilter from "../../../components/Reusable/CategoryFilter/CategoryFilter";
import EmptyState from "../../../components/Reusable/EmptyState/EmptyState";
import GenerateRecipeModal from "../../../components/Dashboard/FoodPage/GenerateRecipeModal/GenerateRecipeModal";

const Food = () => {
  const [isGenerateRecipeModalOpen, setIsGenerateRecipeModalOpen] =
    useState<boolean>(false);
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
      <DashboardHeading
        title="Vedic Food & Recipes"
        description="Discover the art of Sattvic cooking and nourishing prasad recipes to
          balance your mind, body and soul."
      />

      <div className="mt-6 lg:mt-10">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-4 lg:mt-6">
          {/* Grid */}
          <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <FoodCardSkeleton key={index} />
                ))
              : allRecipes?.map((recipe: TFood) => (
                  <FoodCard key={recipe._id} recipe={recipe} />
                ))}
          </div>

          {/* AI Banner — in flow on mobile/tablet, sticky sidebar on desktop */}
          <div className="w-full lg:w-[30%] 2xl:w-[20%] lg:sticky lg:top-10 lg:h-fit">
            <AiRecipeGeneratorBanner
              setIsGenerateRecipeModalOpen={setIsGenerateRecipeModalOpen}
            />
          </div>
        </div>

        {!isLoading && allRecipes?.length === 0 && <EmptyState />}
      </div>

      <GenerateRecipeModal
        isModalOpen={isGenerateRecipeModalOpen}
        setIsModalOpen={setIsGenerateRecipeModalOpen}
      />
    </div>
  );
};

export default Food;