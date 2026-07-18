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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Ayurveda"
          description="Discover the art of Ayurveda to balance your mind, body and soul."
        />

        <Link to="/dashboard/consultancy">
          <Button label="View Experts" />
        </Link>
      </div>{" "}
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
