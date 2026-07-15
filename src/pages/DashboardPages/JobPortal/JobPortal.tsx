/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearchOutline } from "react-icons/io5";
import { ICONS } from "../../../assets";
import JobFilters from "../../../components/Dashboard/JobPortalPage/JobFilters/JobFilters";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useState } from "react";
import JobCard from "../../../components/Dashboard/JobPortalPage/JobCard/JobCard";

const JobPortal = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [jobType, setJobType] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string[]>([]);

  const isLoading = false;
  return (
    <div className="font-Manrope">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Find Your Dream Job"
          description="Explore our various spiritual courses."
        />
        <Button leftIcon={ICONS.plus} label="Post a Job" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 font-GeneralSans mt-10">
        {/* Main Content */}
        <div className="w-full lg:w-[75%] space-y-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
              placeholder="e.g. Software Engineer, Sales Representative, etc."
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-60 text-sm">
              Showing <span className="font-semibold text-neutral-90">10</span>{" "}
              results
              {country && ` in ${country.label}`}
              {state && `, ${state.label}`}
              {city && `, ${city.label}`}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary-10 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Temple Cards */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4]?.map((_, index) => (
                <JobCard />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && (
            <div className="text-center py-12">
              <p className="text-neutral-60">
                No results found matching your filters.
              </p>
            </div>
          )}
        </div>

        {/* Filters Sidebar - Sticky */}
        <div className="w-full lg:w-[25%] lg:sticky top-0 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
          <JobFilters
            setCountry={setCountry}
            setState={setState}
            setCity={setCity}
            setJobType={setJobType}
            setMode={setMode}
            setExperienceLevel={setExperienceLevel}
            setJobCategory={setJobCategory}
            country={country}
            state={state}
            city={city}
            jobType={jobType}
            mode={mode}
            experienceLevel={experienceLevel}
            jobCategory={jobCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
