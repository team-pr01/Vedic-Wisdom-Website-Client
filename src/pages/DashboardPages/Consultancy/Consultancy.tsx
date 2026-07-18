import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ConsultantCard from "../../../components/Dashboard/ConsultancyPage/ConsultantCard/ConsultantCard";
import { IoSearchOutline } from "react-icons/io5";
import { useGetAllConsultantsQuery } from "../../../redux/Features/Consultation/consultantApi";
import type { TConsultant } from "../../../types/consultants.type";
import { useCategories } from "../../../hooks/useCategories";
import CategoryFilter from "../../../components/Reusable/CategoryFilter/CategoryFilter";

const Consultancy = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data } = useGetAllConsultantsQuery({
    keyword,
    category: selectedCategory,
  });
  console.log(data);
  const allConsultants = data?.data?.consultants || [];
  const { categories } = useCategories({
    areaName: "consultants",
  });
  return (
    <div className="font-Manrope">
      <DashboardHeading
        title="Our Expert Consultants"
        description="Book a session with our expert consultants to learn more about Vedic Astrology and Ayurveda."
      />

      {/* Search Input */}
      <div className="relative w-full max-w-md my-6">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-40 w-5 h-5" />
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
          placeholder="Search consultants by name or expertise..."
        />
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {allConsultants?.map((consultant: TConsultant) => (
          <ConsultantCard key={consultant?._id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default Consultancy;
