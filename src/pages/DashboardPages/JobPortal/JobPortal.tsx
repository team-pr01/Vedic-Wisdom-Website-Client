/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { ICONS } from "../../../assets";
import JobFilters from "../../../components/Dashboard/JobPortalPage/JobFilters/JobFilters";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useState } from "react";
import JobCard from "../../../components/Dashboard/JobPortalPage/JobCard/JobCard";
import PostJobModal from "../../../components/Dashboard/JobPortalPage/EmployerPage/PostJobModal/PostJobModal";
import { useGetAlJobsQuery } from "../../../redux/Features/Job/jobApi";
import type { TJob } from "../../../types/job.type";
import JobCardSkeleton from "../../../components/SkeletonLoaders/JobCardSkeleton/JobCardSkeleton";
import EmptyState from "../../../components/Reusable/EmptyState/EmptyState";

const JobPortal = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [jobType, setJobType] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string[]>([]);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching } = useGetAlJobsQuery({
    keyword,
    country: country?.label,
    state: state?.label,
    city: city?.label,
    jobType,
    workMode: mode,
    experienceLevel,
    category: jobCategory,
  });
  const allJobs = data?.data?.jobs || [];

  const filtersProps = {
    setCountry,
    setState,
    setCity,
    setJobType,
    setMode,
    setExperienceLevel,
    setJobCategory,
    country,
    state,
    city,
    jobType,
    mode,
    experienceLevel,
    jobCategory,
  };

  return (
    <div className="font-Manrope">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4">
        <DashboardHeading
          title="Find Your Dream Job"
          description="Explore our various spiritual courses."
        />
        <Button
          onClick={() => setIsPostJobModalOpen(true)}
          leftIcon={ICONS.plus}
          label="Post a Job"
          className="w-full sm:w-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 font-GeneralSans mt-6 lg:mt-10">
        {/* Main Content */}
        <div className="w-full lg:w-[75%] space-y-6">
          {/* Search + mobile filter trigger */}
          <div className="flex items-center gap-3">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55 placeholder:text-sm"
                placeholder="e.g. Software Engineer, Sales Representative, etc."
              />
            </div>

            {/* Filters button — mobile/tablet only */}
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3.25 rounded-lg border bg-white border-neutral-55 text-neutral-90 font-semibold whitespace-nowrap shrink-0"
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
                {allJobs?.length}
              </span>{" "}
              results
              {country && ` in ${country.label}`}
              {state && `, ${state.label}`}
              {city && `, ${city.label}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading || isFetching
              ? Array.from({ length: 8 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))
              : allJobs?.map((job: TJob) => (
                  <JobCard key={job?._id} job={job} />
                ))}
          </div>

          {!isLoading && allJobs?.length === 0 && <EmptyState />}
        </div>

        {/* Filters Sidebar — desktop only (sticky) */}
        <div className="hidden lg:block w-[25%] sticky top-0 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
          <JobFilters {...filtersProps} />
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
              <JobFilters {...filtersProps} />
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

      <PostJobModal
        isModalOpen={isPostJobModalOpen}
        setIsModalOpen={setIsPostJobModalOpen}
      />
    </div>
  );
};

export default JobPortal;