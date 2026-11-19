/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetAllTempleQuery } from "../../../../redux/Features/Temple/templeApi";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import Button from "../../../../components/Reusable/Button/Button";
import Filters from "../../../../components/Dashboard/SanathanSthalPage/Filters/Filters";
import VastuShastraVideoCardSkeleton from "../../../../components/SkeletonLoaders/VastuShastraVideoCardSkeleton/VastuShastraVideoCardSkeleton";
import TempleCard from "../../../../components/Dashboard/SanathanSthalPage/TempleCard/TempleCard";
import type { TTemple } from "../../../../types/temple.type";
import EmptyState from "../../../../components/Reusable/EmptyState/EmptyState";

const SanatanSthal = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [category, setCategory] = useState<any>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetAllTempleQuery({
    keyword,
    country: country?.label,
    state: state?.label,
    city: city?.label,
    category: category?.value,
  });
  const allSanatanSthals = data?.data?.temples || [];

  const filtersProps = {
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    category,
    setCategory,
  };

  return (
    <div className="font-Manrope">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4">
        <DashboardHeading
          title="Explore Sanatan Sthals Worldwide"
          description="Discover the timeless wisdom of Sanatan traditions from around the world. Explore the sacred texts, rituals, and traditions that have shaped our spiritual journey."
        />
        <Link to={"/dashboard/add-temple"} className="w-full sm:w-auto shrink-0">
          <Button label="Add a Temple You Know" className="w-full sm:w-auto" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 font-GeneralSans mt-6 lg:mt-10">
        {/* Filters Sidebar — desktop only (sticky) */}
        <div className="hidden lg:block w-[25%] sticky top-0 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
          <Filters {...filtersProps} />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[75%] space-y-4 lg:space-y-6">
          {/* Search + mobile filter trigger */}
          <div className="flex items-center gap-3">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
                placeholder="Search temples by name or location..."
              />
            </div>

            {/* Filters button — mobile/tablet only */}
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3.5 rounded-lg border bg-white border-neutral-55 text-neutral-90 font-semibold whitespace-nowrap shrink-0"
            >
              <IoFilterOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-60 text-sm">
              Showing{" "}
              <span className="font-semibold text-neutral-90">
                {allSanatanSthals?.length}
              </span>{" "}
              temples
              {country && ` in ${country.label}`}
              {state && `, ${state.label}`}
              {city && `, ${city.label}`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <VastuShastraVideoCardSkeleton key={index} />
                ))
              : allSanatanSthals?.map((temple: TTemple) => (
                  <TempleCard key={temple?._id} temple={temple} />
                ))}
          </div>

          {/* No Results */}
          {!isLoading && allSanatanSthals?.length === 0 && <EmptyState />}
        </div>
      </div>

      {/* Mobile/tablet filters drawer */}
      {isFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFiltersOpen(false)}
          />

          {/* Panel */}
          <div className="relative ml-auto w-full max-w-sm h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-neutral-55">
              <h3 className="text-neutral-5 font-medium">Apply Filters</h3>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="text-neutral-60 text-3xl leading-none px-2"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <Filters {...filtersProps} />
            </div>

            <div className="p-4 border-t border-neutral-55">
              <Button
                onClick={() => setIsFiltersOpen(false)}
                label="Show Results"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SanatanSthal;