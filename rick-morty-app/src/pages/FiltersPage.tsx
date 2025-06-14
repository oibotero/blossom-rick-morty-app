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

  const handleApplyFilters = () => {
    dispatch(setCharacterFilter(character));
    dispatch(setSpeciesFilter(species));
    dispatch(setStatusFilter(status));
    dispatch(setGenderFilter(gender));
    navigate("/advanced-search");
  };

  useEffect(() => {
    if (!isMobile) {
      navigate("/");
    }
  }, [isMobile, navigate]);

  const renderFilterButtons = (
    label: string,
    values: string[],
    current: string,
    setFn: any
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-2 flex-wrap">
        {values.map((val) => (
          <button
            key={val}
            onClick={() => setFn(val)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              current === val
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center px-4 py-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-700 hover:text-primary-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold ml-4">Filtros</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {renderFilterButtons(
          "Character type",
          ["all", "starred", "others"],
          character,
          setCharacter
        )}
        {renderFilterButtons(
          "Species",
          ["all", "human", "alien"],
          species,
          setSpecies
        )}
        {renderFilterButtons(
          "State",
          ["all", "alive", "dead", "unknown"],
          status,
          setStatus
        )}
        {renderFilterButtons(
          "Gender",
          ["all", "male", "female", "genderless", "unknown"],
          gender,
          setGender
        )}
      </div>

      <div className="px-4 py-3 border-t">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
