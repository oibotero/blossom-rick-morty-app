import React from "react";
import { useFavorites } from "./FavoritesContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
  search: string;
  speciesFilter: "all" | "human" | "alien";
  characterFilter: "all" | "starred" | "others";
}
function FavoriteList({
  onSelect,
  selectedId,
  search,
  speciesFilter,
  characterFilter,
}: Props) {
  const { favorites, removeFavorite } = useFavorites();
  const filteredFavorites = favorites.filter((char) => {
    // Filtro por nombre
    if (search && !char.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Filtro por especie
    if (
      speciesFilter !== "all" &&
      char.species.toLowerCase() !== speciesFilter
    ) {
      return false;
    }

    // Solo mostrar favoritos si el filtro es "all" o "starred"
    if (characterFilter === "others") return false;

    return true;
  });

  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">
        STARRED CHARACTERS ({filteredFavorites.length})
      </h2>

      {filteredFavorites.length === 0 ? (
        <p className="text-sm italic text-gray-400">No favorites found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredFavorites.map((char) => (
            <li
              key={char.id}
              onClick={() => onSelect(char.id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedId === char.id ? "bg-primary-100" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
              />

              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {char.name}
                </span>
                <span className="text-xs text-gray-500">{char.gender}</span>
              </div>

              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(char.id);
                }}
                className="ml-auto p-1.5 bg-white rounded-full shadow hover:bg-gray-50"
              >
                <Heart className="w-5 h-5 fill-secondary-600 stroke-none" />
              </motion.button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteList;
