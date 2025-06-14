import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

type SearchProps = {
  setSearch: (value: string) => void;
  updatePageNumber: (page: number) => void;
  setCharacterFilter: (value: "all" | "starred" | "others") => void;
  setSpeciesFilter: (value: "all" | "human" | "alien") => void;
};

const Search: React.FC<SearchProps> = ({
  setSearch,
  updatePageNumber,
  setCharacterFilter,
  setSpeciesFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCharacterFilter, setTempCharacterFilter] = useState<
    "all" | "starred" | "others"
  >("all");
  const [tempSpeciesFilter, setTempSpeciesFilter] = useState<
    "all" | "human" | "alien"
  >("all");

  const applyFilters = () => {
    setCharacterFilter(tempCharacterFilter);
    setSpeciesFilter(tempSpeciesFilter);
    setIsFilterOpen(false); // ocultar filtros
  };

  return (
    <div className="mb-6 px-4 sm:px-0">
      {/* Search bar and filter toggle */}
      <form className="flex gap-2 items-center w-full">
        <input
          type="text"
          placeholder="Search characters"
          onChange={(e) => {
            updatePageNumber(1);
            setSearch(e.target.value);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
        />

        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </form>

      {/* Filters panel */}
      {isFilterOpen && (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-md animate-fade-in space-y-4">
          {/* Character filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Character
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", "starred", "others"].map((val) => (
                <button
                  key={val}
                  onClick={() => setTempCharacterFilter(val as any)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    tempCharacterFilter === val
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  type="button"
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Species filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Species
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", "human", "alien"].map((val) => (
                <button
                  key={val}
                  onClick={() => setTempSpeciesFilter(val as any)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    tempSpeciesFilter === val
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  type="button"
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <button
            onClick={applyFilters}
            type="button"
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
