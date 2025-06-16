import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import type { Character } from "@/types/character";
import FavoritesComponent from "./FavoritesComponent";
import { selectFilters } from "@/store/selector";
import { hideCharacter } from "../../store/slices/hiddenCharactersSlice";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

export default function FavoriteList({ onSelect, selectedId }: Props) {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  // Combinar filtros de ambos slices
  const filtersFromCharacters = useSelector(
    (state: RootState) => state.characters
  );
  const filtersFromFiltersSlice = useSelector(selectFilters);

  const activeSearch =
    filtersFromFiltersSlice.search || filtersFromCharacters.search;
  const activeSpeciesFilter =
    filtersFromFiltersSlice.species !== "all"
      ? filtersFromFiltersSlice.species
      : filtersFromCharacters.speciesFilter;

  const activeCharacterFilter =
    filtersFromFiltersSlice.character !== "all"
      ? filtersFromFiltersSlice.character
      : filtersFromCharacters.characterFilter;

  const activeStatusFilter =
    filtersFromFiltersSlice.status !== "all"
      ? filtersFromFiltersSlice.status
      : filtersFromCharacters.statusFilter;

  const activeGenderFilter =
    filtersFromFiltersSlice.gender !== "all"
      ? filtersFromFiltersSlice.gender
      : filtersFromCharacters.genderFilter;

  const activeSortOrder = filtersFromCharacters.sortOrder;

  const filteredFavorites = favorites
    .filter((char) => {
      // Filtro por tipo de personaje
      if (activeCharacterFilter === "others") return false;
      if (
        activeCharacterFilter !== "all" &&
        activeCharacterFilter !== "starred"
      ) {
        return false;
      }

      // Filtro por especie
      if (
        activeSpeciesFilter !== "all" &&
        char.species.toLowerCase() !== activeSpeciesFilter
      ) {
        return false;
      }

      // Filtro por nombre
      if (
        activeSearch &&
        !char.name.toLowerCase().includes(activeSearch.toLowerCase())
      ) {
        return false;
      }

      // Filtro por estado
      if (
        activeStatusFilter !== "all" &&
        char.status.toLowerCase() !== activeStatusFilter
      ) {
        return false;
      }

      // Filtro por género
      if (
        activeGenderFilter !== "all" &&
        char.gender.toLowerCase() !== activeGenderFilter
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) =>
      activeSortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const hiddenIds = useSelector((state: RootState) => state.hiddenCharacters);
  const visibleCharacters = filteredFavorites.filter(
    (char) => !hiddenIds.includes(Number(char.id))
  );

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-4 sticky top-0 bg-white z-10">
        STARRED CHARACTERS ({visibleCharacters.length})
      </h2>
      <ul className="divide-y divide-gray-200">
        {visibleCharacters.map((char) => (
          <li
            key={char.id}
            onClick={() => onSelect(Number(char.id))}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer mb-1 ${
              selectedId === char.id ? "bg-primary-100" : "hover:bg-gray-100"
            }`}
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {char.id} {char.name}
              </p>
              <p className="text-xs text-gray-500">{char.species}</p>
            </div>

            <FavoritesComponent
              itemId={char.id}
              itemName={char.name}
              itemImage={char.image}
              itemGender={char.gender}
              itemSpecies={char.species}
              itemStatus={char.status}
              itemOccupation={char.occupation}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
