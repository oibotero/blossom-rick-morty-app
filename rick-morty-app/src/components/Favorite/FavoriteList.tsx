// src/components/Favorite/FavoriteList.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import type { Character } from "@/types/character";
import FavoritesComponent from "./FavoritesComponent";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
  search: string;
  speciesFilter: string;
  characterFilter: "all" | "starred" | "others";
  sortOrder: "asc" | "desc";
}

export default function FavoriteList({
  onSelect,
  selectedId,
  search,
  speciesFilter,
  characterFilter,
  sortOrder,
}: Props) {
  // ✅ Usa Redux en vez del context
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const filteredFavorites = favorites
    .filter((char) => {
      if (
        speciesFilter !== "all" &&
        char.species.toLowerCase() !== speciesFilter
      )
        return false;

      if (search && !char.name.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (characterFilter === "others") return false;
      if (characterFilter === "all" || characterFilter === "starred")
        return true;

      return true;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-4 sticky top-0 bg-white z-10">
        FAVORITES ({filteredFavorites.length})
      </h2>
      <ul className="divide-y divide-gray-200">
        {filteredFavorites.map((char) => (
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
