import React, { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setSearch,
  setCharacterFilter,
  setSpeciesFilter,
  setStatusFilter,
  setGenderFilter,
} from "../../store/slices/filtersSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [tempCharacterFilter, setTempCharacterFilter] = useState<
    "all" | "starred" | "others"
  >("all");
  const [tempSpeciesFilter, setTempSpeciesFilter] = useState<
    "all" | "human" | "alien"
  >("all");
  const [tempStatusFilter, setTempStatusFilter] = useState<
    "all" | "alive" | "dead" | "unknown"
  >("all");
  const [tempGenderFilter, setTempGenderFilter] = useState<
    "all" | "male" | "female" | "genderless" | "unknown"
  >("all");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applyFilters = () => {
    dispatch(setSearch(searchInput));
    dispatch(setCharacterFilter(tempCharacterFilter));
    dispatch(setSpeciesFilter(tempSpeciesFilter));
    dispatch(setStatusFilter(tempStatusFilter));
    dispatch(setGenderFilter(tempGenderFilter));
    console.log(tempGenderFilter);
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-6 px-4 sm:px-0">
      <form className="flex gap-2 items-center w-full">
        <input
          type="text"
          placeholder="Search characters"
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);
            dispatch(setSearch(value));
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
        />

        <button
          type="button"
          onClick={() => {
            if (isMobile) {
              navigate("/filters");
            } else {
              setIsFilterOpen(true);
            }
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </form>

      {isFilterOpen && (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-md animate-fade-in space-y-4">
          <FilterGroup
            label="Character"
            options={["all", "starred", "others"]}
            selected={tempCharacterFilter}
            onChange={setTempCharacterFilter}
          />

          <FilterGroup
            label="Species"
            options={["all", "human", "alien"]}
            selected={tempSpeciesFilter}
            onChange={setTempSpeciesFilter}
          />

          <FilterGroup
            label="Status"
            options={["all", "alive", "dead", "unknown"]}
            selected={tempStatusFilter}
            onChange={setTempStatusFilter}
          />

          <FilterGroup
            label="Gender"
            options={["all", "male", "female", "genderless", "unknown"]}
            selected={tempGenderFilter}
            onChange={setTempGenderFilter}
          />

          <button
            onClick={applyFilters}
            type="button"
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;

const FilterGroup = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((val) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          className={`px-3 py-1 rounded-full text-sm border transition ${
            selected === val
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </button>
      ))}
    </div>
  </div>
);
