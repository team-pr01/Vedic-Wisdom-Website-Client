/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, forwardRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
  isoCode?: string; // Add isoCode as optional
  [key: string]: any; // Allow additional properties
}

interface SingleSelectDropdownProps {
  label?: string;
  name?: string;
  options: Option[];
  placeholder?: string;
  error?: string;
  value?: Option | string | string[] | any;
  onChange?: (selected: Option) => void;
  onChangeEvent?: (selected: Option) => void;
  isRequired?: boolean;
  dropdownDirection?: string;
}

const FilterDropdown = forwardRef<
  HTMLDivElement,
  SingleSelectDropdownProps
>(
  ({
    label,
    name,
    options,
    placeholder = "Select An Option",
    error,
    value = "",
    onChange,
    onChangeEvent,
    isRequired = true,
    dropdownDirection = "top-full",
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize incoming `value`
    useEffect(() => {
      if (typeof value === "object" && value !== null) {
        setSelectedOption(value);
      } else if (typeof value === "string") {
        const found = options.find((opt) => opt.value === value);
        setSelectedOption(found || null);
      } else {
        setSelectedOption(null);
      }
    }, [value, options]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (option: Option) => {
      setSelectedOption(option);
      if (onChange) {
        onChange(option);
      }
      if (onChangeEvent) {
        onChangeEvent(option);
      }
      setIsOpen(false);
      setSearchTerm("");
    };

    // Get display label for selected value
    const getSelectedLabel = () => {
      return selectedOption ? selectedOption.label : "";
    };

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="flex flex-col gap-2 font-Nunito" ref={dropdownRef}>
        {label && (
          <label
            htmlFor={name}
            className="flex flex-row items-center w-full justify-between text-neutral-65"
          >
            <span className="text-neutral-10 leading-4.5 text-[15px] font-medium tracking-[-0.16]">
              {label}{" "}
              <span className="text-primary-10">{isRequired ? "*" : ""}</span>
            </span>
          </label>
        )}

        <div className="relative">
          <button
            type="button"
            className={`w-full px-4 py-3.5 rounded-lg bg-white border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 text-left flex items-center justify-between cursor-pointer ${
              error ? "border-red-500" : "border-neutral-55"
            } ${!selectedOption ? "text-neutral-10/50" : "text-neutral-10"}`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="truncate capitalize">
              {getSelectedLabel() || placeholder}
            </span>
            <FiChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {isOpen && (
            <div
              className={`absolute z-30 ${dropdownDirection} mb-1 w-full rounded-lg bg-white shadow-lg border border-neutral-45/30 max-h-60 overflow-auto`}
            >
              {/* Search input */}
              <div className="sticky top-0 bg-white p-2 border-b border-neutral-55">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm border border-neutral-55 rounded-md focus:outline-none focus:border-primary-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {filteredOptions?.length > 0 ? (
                filteredOptions?.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-neutral-98 capitalize ${
                      selectedOption?.value === option.value
                        ? "bg-neutral-98 font-medium"
                        : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                    {option.isoCode && (
                      <span className="text-xs text-neutral-40 ml-2">
                        ({option.isoCode})
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-neutral-50 text-sm">
                  No options found
                </div>
              )}
            </div>
          )}
        </div>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

FilterDropdown.displayName = "FilterDropdown";

export default FilterDropdown;