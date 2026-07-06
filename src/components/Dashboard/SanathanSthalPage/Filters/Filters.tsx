/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICONS } from "../../../../assets";
import { Country, State, City } from "country-state-city";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

type TFilters = {
  setCountry: any;
  setState: any;
  setCity: any;
  setCategory: any;
  country: any;
  state: any;
  city: any;
  category: string;
};

const Filters: React.FC<TFilters> = ({
  setCountry,
  setState,
  setCity,
  setCategory,
  country,
  state,
  city,
  category,
}) => {
  // States for location hierarchy
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);

  // Countries
  const countries = Country.getAllCountries();

  const countryOptions = countries.map((country) => ({
    label: country?.name,
    value: country?.isoCode,
    isoCode: country?.isoCode,
    countryData: country,
  }));

  // Category Options
  const categoryOptions = [
    { label: "All Temples", value: "all" },
    { label: "Ganesh Temple", value: "ganesh" },
    { label: "Durga Temple", value: "durga" },
    { label: "Shiva Temple", value: "shiva" },
    { label: "Vishnu Temple", value: "vishnu" },
    { label: "Krishna Temple", value: "krishna" },
    { label: "Hanuman Temple", value: "hanuman" },
    { label: "Saraswati Temple", value: "saraswati" },
    { label: "Lakshmi Temple", value: "lakshmi" },
    { label: "Kali Temple", value: "kali" },
    { label: "Ram Temple", value: "ram" },
    { label: "Sita Temple", value: "sita" },
    { label: "Radha Krishna Temple", value: "radha-krishna" },
    { label: "Jagannath Temple", value: "jagannath" },
    { label: "Venkateswara Temple", value: "venkateswara" },
    { label: "Murugan Temple", value: "murugan" },
    { label: "Ayyappa Temple", value: "ayyappa" },
    { label: "Sai Baba Temple", value: "sai-baba" },
    { label: "Mata Temple", value: "mata" },
    { label: "Navagraha Temple", value: "navagraha" },
    { label: "Panchayatana Temple", value: "panchayatana" },
    { label: "Ashram", value: "ashram" },
    { label: "Gurudwara", value: "gurudwara" },
  ];

  // Handle country selection
  const handleCountrySelect = (selected: any) => {
    setSelectedCountry(selected);
    setSelectedState(null);
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
    setSelectedState(selected);
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

  // Handle category selection
  const handleCategorySelect = (selected: any) => {
    setCategory(selected);
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
    setSelectedState(null);
    setCities([]);
    setStates([]);
    setCountry(null);
    setState(null);
    setCity(null);
    setCategory(null);
  };

  return (
    <div className="bg-white border border-neutral-55 rounded-2xl px-6 py-5 h-fit">
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
        <p className="text-neutral-10/90 text-[15px]">
          View temples{" "}
          <span className="font-medium text-primary-10 underline">Near Me</span>
        </p>

        {/* Category Dropdown */}
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={handleCategorySelect}
          isRequired={false}
          placeholder="Select category"
          dropdownDirection="bottom-full"
        />

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
  );
};

export default Filters;
