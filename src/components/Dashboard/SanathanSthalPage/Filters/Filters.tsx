/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../../../assets";
import { Country, State, City } from "country-state-city";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";
import { useCategories } from "../../../../hooks/useCategories";
// import { useUserLocation } from "../../../../hooks/useUserLocation";
import toast from "react-hot-toast";

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
  const [isLocating, setIsLocating] = useState(false);

  // Countries
  const countries = Country.getAllCountries();

  const { categories } = useCategories({
    areaName: "temple",
  });

  const countryOptions = countries.map((country) => ({
    label: country?.name,
    value: country?.isoCode,
    isoCode: country?.isoCode,
    countryData: country,
  }));

  // Category Options
  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }));

  // Handle Near Me click
  const handleNearMe = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        },
      );

      const { latitude, longitude } = position.coords;

      // Reverse geocoding to get location details
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      const data = await response.json();

      const cityName = data.city || data.locality || null;
      const stateName = data.principalSubdivision || null;
      const countryName = data.countryName || null;
      const countryCode = data.countryCode || null;

      // Set country
      if (countryCode) {
        const countryObj = countries.find((c) => c.isoCode === countryCode);
        if (countryObj) {
          const selectedCountry = {
            label: countryObj.name,
            value: countryObj.isoCode,
            isoCode: countryObj.isoCode,
            countryData: countryObj,
          };
          setSelectedCountry(selectedCountry);
          setCountry(selectedCountry);

          // Get states for this country
          const countryStates = State.getStatesOfCountry(countryObj.isoCode);
          setStates(countryStates);

          // Set state
          if (stateName) {
            const stateObj = countryStates.find((s) => s.name === stateName);
            if (stateObj) {
              const selectedState = {
                label: stateObj.name,
                value: stateObj.isoCode,
                isoCode: stateObj.isoCode,
                stateData: stateObj,
              };
              setSelectedState(selectedState);
              setState(selectedState);

              // Get cities for this state
              const stateCities = City.getCitiesOfState(
                countryObj.isoCode,
                stateObj.isoCode,
              );
              setCities(stateCities);

              // Set city
              if (cityName) {
                const cityObj = stateCities.find((c) => c.name === cityName);
                if (cityObj) {
                  const selectedCity = {
                    label: cityObj.name,
                    value: cityObj.name,
                    cityData: cityObj,
                  };
                  setCity(selectedCity);
                }
              }
            }
          }

          toast.success(
            `Location set to ${cityName || stateName || countryName}`,
          );
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to get location");
    } finally {
      setIsLocating(false);
    }
  };

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
    console.log(selected);
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
          <button
            onClick={handleNearMe}
            disabled={isLocating}
            className="font-medium text-primary-10 underline hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isLocating ? "Getting location..." : "Near Me"}
          </button>
        </p>

        {/* Category Dropdown */}
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={handleCategorySelect}
          isRequired={false}
          placeholder="Select category"
          dropdownDirection="top-full"
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
          dropdownDirection="bottom-full"
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
