/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICONS } from "../../../../assets";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import FilterDropdown from "../../SanathanSthalPage/Filters/FilterDropdown";

type TJobFilters = {
  setCountry: any;
  setState: any;
  setCity: any;
  setJobType: any;
  setMode: any;
  setExperienceLevel: any;
  setJobCategory: any;
  country: any;
  state: any;
  city: any;
  jobType: string;
  mode: string;
  experienceLevel: string[];
  jobCategory: string[];
};

const JobFilters: React.FC<TJobFilters> = ({
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
  jobType = "all",
  mode = "all",
  experienceLevel = [],
  jobCategory = [],
}) => {
  // States for location hierarchy
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  // Countries
  const countries = Country.getAllCountries();

  const countryOptions = countries.map((country) => ({
    label: country?.name,
    value: country?.isoCode,
    isoCode: country?.isoCode,
    countryData: country,
  }));

  // Job Type Options
  const jobTypeOptions = [
    { label: "All", value: "all" },
    { label: "Full Time", value: "fullTime" },
    { label: "Part Time", value: "partTime" },
    { label: "Contractual", value: "contractual" },
    { label: "Internship", value: "internship" },
    { label: "Freelance", value: "freelance" },
  ];

  // Mode Options
  const modeOptions = [
    { label: "All", value: "all" },
    { label: "Remote", value: "remote" },
    { label: "Onsite", value: "onsite" },
    { label: "Hybrid", value: "hybrid" },
  ];

  // Experience Level Options
  const experienceOptions = [
    { label: "Fresher (0-1 year)", value: "fresher" },
    { label: "Junior (1-3 years)", value: "junior" },
    { label: "Mid-level (3-5 years)", value: "mid" },
    { label: "Senior (5+ years)", value: "senior" },
    { label: "Expert (8+ years)", value: "expert" },
  ];

  // Job Category Options
  const jobCategoryOptions = [
    { label: "Accounting & Finance", value: "accountingFinance" },
    { label: "Administrative & Office", value: "administrativeOffice" },
    { label: "Advertising & Marketing", value: "advertisingMarketing" },
    { label: "Art & Creative", value: "artCreative" },
    { label: "Banking & Financial Services", value: "bankingFinancial" },
    { label: "Business Development", value: "businessDevelopment" },
    { label: "Consultancy", value: "consultancy" },
    { label: "Customer Service", value: "customerService" },
    { label: "Data Science & Analytics", value: "dataScienceAnalytics" },
    { label: "Education & Training", value: "educationTraining" },
    { label: "Engineering", value: "engineering" },
    { label: "Entertainment & Media", value: "entertainmentMedia" },
    { label: "Government & Public Sector", value: "governmentPublic" },
    { label: "Healthcare & Wellness", value: "healthcareWellness" },
    { label: "Hospitality & Tourism", value: "hospitalityTourism" },
    { label: "Human Resources", value: "humanResources" },
    { label: "Information Technology", value: "informationTechnology" },
    { label: "Legal & Compliance", value: "legalCompliance" },
    { label: "Logistics & Supply Chain", value: "logisticsSupplyChain" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Media & Communications", value: "mediaCommunications" },
    { label: "Non-Profit & NGO", value: "nonProfitNgo" },
    { label: "Project Management", value: "projectManagement" },
    { label: "Real Estate", value: "realEstate" },
    { label: "Research & Development", value: "researchDevelopment" },
    { label: "Retail", value: "retail" },
    { label: "Sales", value: "sales" },
    { label: "Software Development", value: "softwareDevelopment" },
    { label: "Sports & Fitness", value: "sportsFitness" },
    { label: "Spiritual & Wellness", value: "spiritualWellness" },
    { label: "Technology", value: "technology" },
    { label: "Travel & Tourism", value: "travelTourism" },
    { label: "UX/UI Design", value: "uxUiDesign" },
    { label: "Writing & Editing", value: "writingEditing" },
    { label: "Other", value: "other" },
  ];

  // Handle country selection
  const handleCountrySelect = (selected: any) => {
    setSelectedCountry(selected);
    setCities([]);
    setState(null);
    setCity(null);

    if (selected?.isoCode) {
      const countryStates = State.getStatesOfCountry(selected.isoCode);
      setStates(countryStates);
    }

    setCountry(selected);
  };

  // Handle state selection
  const handleStateSelect = (selected: any) => {
    setCities([]);
    setCity(null);

    if (selected?.value && selectedCountry?.isoCode) {
      const stateCities = City.getCitiesOfState(
        selectedCountry.isoCode,
        selected.value,
      );
      setCities(stateCities);
    }

    setState(selected);
  };

  // Handle city selection
  const handleCitySelect = (selected: any) => {
    setCity(selected);
  };

  // Handle checkbox change for experience
  const handleExperienceChange = (value: string) => {
    const currentSelection = experienceLevel || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item: string) => item !== value)
      : [...currentSelection, value];
    setExperienceLevel(newSelection);
  };

  // Handle checkbox change for job category
  const handleJobCategoryChange = (value: string) => {
    const currentSelection = jobCategory || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item: string) => item !== value)
      : [...currentSelection, value];
    setJobCategory(newSelection);
  };

  // State options
  const stateOptions = states.map((state) => ({
    label: state?.name,
    value: state?.isoCode,
    isoCode: state?.isoCode,
    stateData: state,
  }));

  // City options
  const cityOptions = cities.map((city) => ({
    label: city?.name,
    value: city?.name,
    cityData: city,
  }));

  const handleClearFilters = () => {
    setSelectedCountry(null);
    setCities([]);
    setStates([]);
    setCountry(null);
    setState(null);
    setCity(null);
    setJobType("all");
    setMode("all");
    setExperienceLevel([]);
    setJobCategory([]);
  };

  return (
    <div className="bg-white border border-neutral-55 rounded-2xl px-6 py-5 h-fit overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-40/60 pb-4">
        <h3 className="text-neutral-5 font-medium">Apply Filters</h3>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1.5 text-primary-5 hover:opacity-70 transition-opacity"
        >
          Clear <img src={ICONS.reset} alt="reset" className="size-4" />
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {/* Job Type - Horizontal Buttons */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Job Type
          </label>
          <div className="flex flex-wrap gap-2">
            {jobTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setJobType(option.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  jobType === option.value
                    ? "bg-primary-10 text-white"
                    : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode - Horizontal Buttons */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Mode
          </label>
          <div className="flex flex-wrap gap-2">
            {modeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMode(option.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  mode === option.value
                    ? "bg-primary-10 text-white"
                    : "bg-neutral-10/5 text-neutral-60 hover:bg-neutral-10/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level - Checkboxes */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Experience Level
          </label>
          <div className="space-y-2">
            {experienceOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(experienceLevel || []).includes(option.value)}
                  onChange={() => handleExperienceChange(option.value)}
                  className="w-4 h-4 accent-primary-10 cursor-pointer"
                />
                <span className="text-sm text-neutral-60 group-hover:text-neutral-90 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Category - Checkboxes */}
        <div>
          <label className="text-neutral-10 text-sm font-medium block mb-2">
            Job Category
          </label>
          <div className="space-y-2">
            {jobCategoryOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(jobCategory || []).includes(option.value)}
                  onChange={() => handleJobCategoryChange(option.value)}
                  className="w-4 h-4 accent-primary-10 cursor-pointer"
                />
                <span className="text-sm text-neutral-60 group-hover:text-neutral-90 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filters */}
        <div className="border-t border-neutral-20 pt-4 mt-4">
          <p className="text-sm font-medium text-neutral-90 mb-3">Location</p>
          <div className="space-y-4">
            {/* Country Dropdown */}
            <FilterDropdown
              label="Country"
              options={countryOptions}
              value={country}
              onChange={handleCountrySelect}
              isRequired={false}
              placeholder="Select country"
            />

            {/* State Dropdown*/}
            <FilterDropdown
              label="State"
              options={stateOptions}
              value={state}
              onChange={handleStateSelect}
              isRequired={false}
              placeholder="Select state"
            />

            {/* City Dropdown*/}
            <FilterDropdown
              label="City"
              options={cityOptions}
              value={city}
              onChange={handleCitySelect}
              isRequired={false}
              placeholder="Select city"
              dropdownDirection="bottom-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
