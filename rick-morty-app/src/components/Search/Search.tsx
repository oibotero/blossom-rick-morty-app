import React, { useState, useEffect } from "react";
import { SlidersVerticalIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSearch,
  setCharacterFilter,
  setSpeciesFilter,
  setStatusFilter,
  setGenderFilter,
} from "../../store/slices/filtersSlice";

// Componente principal de búsqueda y filtros
const Search: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado del input de búsqueda
  const [searchInput, setSearchInput] = useState("");

  // Estados temporales para filtros
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

  // Estados de UI
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar cambio de tamaño de ventana para saber si es mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Verifica si hay filtros activos distintos a "all"
  const hasActiveFilters =
    tempCharacterFilter !== "all" ||
    tempSpeciesFilter !== "all" ||
    tempStatusFilter !== "all" ||
    tempGenderFilter !== "all";

  // Aplica los filtros al estado global
  const applyFilters = () => {
    dispatch(setSearch(searchInput));
    dispatch(setCharacterFilter(tempCharacterFilter));
    dispatch(setSpeciesFilter(tempSpeciesFilter));
    dispatch(setStatusFilter(tempStatusFilter));
    dispatch(setGenderFilter(tempGenderFilter));
    setIsFilterOpen(false);
    setIsFilterApplied(true);
  };

  return (
    <div className="mb-6 px-4 pl-0 sm:px-0">
      {/* Input de búsqueda */}
      <form className="relative w-full">
        <input
          type="text"
          placeholder="Search or filter results"
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);
            dispatch(setSearch(value));
          }}
          className="w-full pr-10 px-4 py-2 border bg-gray-100 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
        />

        {/* Botón de filtros */}
        <button
          type="button"
          onClick={() => {
            if (isMobile) {
              navigate("/filters");
            } else {
              setIsFilterOpen(true);
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-violet-100 hover:bg-gray-100 transition"
        >
          <SlidersVerticalIcon className="w-5 h-5" />
        </button>
      </form>

      {/* Panel de filtros desplegable (versión escritorio) */}
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

          {/* Botón para aplicar filtros */}
          <button
            onClick={applyFilters}
            type="button"
            disabled={!hasActiveFilters && !isFilterApplied}
            className={`w-full py-2 rounded-lg transition ${
              hasActiveFilters || isFilterApplied
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-300 text-white cursor-not-allowed opacity-50"
            }`}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;

// Componente reutilizable para cada grupo de filtros
const FilterGroup = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string; // Etiqueta del filtro (ej: "Gender")
  options: string[]; // Opciones disponibles
  selected: string; // Opción actualmente seleccionada
  onChange: (val: string) => void; // Función para cambiar el valor
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
          className={`min-w-[90px] text-center px-4 py-2 text-sm rounded-lg border transition-all ${
            selected === val
              ? "bg-primary-100 text-primary-700 border-primary-600"
              : "bg-white text-black border-gray-300 hover:bg-gray-50"
          }`}
        >
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </button>
      ))}
    </div>
  </div>
);
