import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import AyurvedaCard from "../../../components/Dashboard/AyurvedaPage/AyurvedaCard/AyurvedaCard";
import { useGetAllAyurvedaQuery } from "../../../redux/Features/Ayurveda/ayurvedaApi";
import type { TAyurveda } from "../../../types/ayurveda.type";
import AyurvedaCardSkeleton from "../../../components/SkeletonLoaders/AyurvedaCardSkeleton/AyurvedaCardSkeleton";
import CategoryFilter from "../../../components/Reusable/CategoryFilter/CategoryFilter";
import { useCategories } from "../../../hooks/useCategories";
import Button from "../../../components/Reusable/Button/Button";
import { Link } from "react-router-dom";

const Ayurveda = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data, isLoading } = useGetAllAyurvedaQuery({
    category: selectedCategory,
  });
  const allAyurveda = data?.data?.ayurveda || [];
  const { categories } = useCategories({
    areaName: "ayurveda",
  });
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4">
        <DashboardHeading
          title="Ayurveda"
          description="Discover the art of Ayurveda to balance your mind, body and soul."
        />

        <Link to="/dashboard/consultancy" className="w-full sm:w-auto shrink-0">
          <Button label="View Experts" className="w-full sm:w-auto" />
        </Link>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <AyurvedaCardSkeleton key={index} />
            ))
          : allAyurveda?.map((ayurveda: TAyurveda) => (
              <AyurvedaCard key={ayurveda?._id} ayurveda={ayurveda} />
            ))}
      </div>
    </div>
  );
};

export default Ayurveda;