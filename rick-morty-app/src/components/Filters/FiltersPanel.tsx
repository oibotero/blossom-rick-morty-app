// src/components/Filters/FiltersPanel.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/slices/filtersSlice";

// Tipos posibles para los filtros
type CharacterType = "all" | "starred" | "others";
type SpeciesType = "all" | "human" | "alien";
type StatusType = "all" | "alive" | "dead" | "unknown";
type GenderType = "all" | "male" | "female" | "genderless" | "unknown";

export default function FiltersPanel() {
  const dispatch = useDispatch();

  // Estados locales para los selectores de filtros
  const [character, setCharacter] = useState<CharacterType>("all");
  const [species, setSpecies] = useState<SpeciesType>("all");
  const [status, setStatus] = useState<StatusType>("all");
  const [gender, setGender] = useState<GenderType>("all");

  // Envia los filtros actuales al store de Redux
  const applyFilters = () => {
    dispatch(setFilters({ character, species, status, gender, search: "" }));
  };

  return (
    <div className="grid gap-4 mb-6">
      {/* Filtro: Tipo de personaje */}
      <div className="grid gap-1">
        <label className="text-sm font-medium">Character Type</label>
        <select
          className="p-2 border rounded"
          value={character}
          onChange={(e) => setCharacter(e.target.value as CharacterType)}
        >
          <option value="all">All</option>
          <option value="starred">Starred</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Filtro: Especie */}
      <div className="grid gap-1">
        <label className="text-sm font-medium">Species</label>
        <select
          className="p-2 border rounded"
          value={species}
          onChange={(e) => setSpecies(e.target.value as SpeciesType)}
        >
          <option value="all">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>
      </div>

      {/* Filtro: Estado */}
      <div className="grid gap-1">
        <label className="text-sm font-medium">Status</label>
        <select
          className="p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusType)}
        >
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Filtro: Género */}
      <div className="grid gap-1">
        <label className="text-sm font-medium">Gender</label>
        <select
          className="p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value as GenderType)}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Botón de aplicar filtros */}
      <button
        onClick={applyFilters}
        className="bg-secondary-600 text-white py-2 rounded hover:opacity-90 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
