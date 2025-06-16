import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import useIsMobile from "../hooks/useIsMobile";
import {
  setCharacterFilter,
  setSpeciesFilter,
  setStatusFilter,
  setGenderFilter,
} from "@/store/slices/filtersSlice";

export default function FiltersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const [character, setCharacter] = useState<"all" | "starred" | "others">(
    "all"
  );
  const [species, setSpecies] = useState<"all" | "human" | "alien">("all");
  const [status, setStatus] = useState<"all" | "alive" | "dead" | "unknown">(
    "all"
  );
  const [gender, setGender] = useState<
    "all" | "male" | "female" | "genderless" | "unknown"
  >("all");

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleApplyFilters = () => {
    dispatch(setCharacterFilter(character));
    dispatch(setSpeciesFilter(species));
    dispatch(setStatusFilter(status));
    dispatch(setGenderFilter(gender));
    setIsFilterApplied(true);
    navigate("/advanced-search");
  };

  useEffect(() => {
    if (!isMobile) {
      navigate("/");
    }
  }, [isMobile, navigate]);

  const renderFilterButtons = <T extends string>(
    label: string,
    options: T[],
    selected: T,
    onChange: (val: T) => void
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`min-w-[90px] text-center px-4 py-2 text-sm rounded-lg border transition-all 
                ${
                  isSelected
                    ? "bg-primary-100 text-primary-700"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="relative flex items-center justify-between px-4 py-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-700 hover:text-primary-600 z-10"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
          Filters
        </h2>
        <div className="w-[64px] h-[40px]" /> {/* espacio reservado */}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {renderFilterButtons(
          "Character type",
          ["all", "starred", "others"] as const,
          character,
          (val) => setCharacter(val as typeof character)
        )}
        {renderFilterButtons(
          "Species",
          ["all", "human", "alien"] as const,
          species,
          (val) => setSpecies(val as typeof species)
        )}
        {renderFilterButtons(
          "State",
          ["all", "alive", "dead", "unknown"] as const,
          status,
          (val) => setStatus(val as typeof status)
        )}
        {renderFilterButtons(
          "Gender",
          ["all", "male", "female", "genderless", "unknown"] as const,
          gender,
          (val) => setGender(val as typeof gender)
        )}
        {/* Agrega un margin-bottom para que no tape el botón */}
        <div className="h-20" />
      </div>

      {/* Fixed button at the bottom */}
      <div className="sticky bottom-0 bg-white px-4 py-3 border-t">
        <button
          onClick={handleApplyFilters}
          className={`w-full py-3 rounded-lg transition ${"bg-primary-600 text-white hover:bg-primary-700"}`}
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
