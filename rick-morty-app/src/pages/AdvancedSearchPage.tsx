import React from "react";
import { useSelector } from "react-redux";
import {
  selectFilteredCharacters,
  selectFilteredFavorites,
  selectFilters,
} from "@/store/selector";
import FavoritesComponent from "@/components/Favorite/FavoritesComponent";
import { useNavigate } from "react-router-dom";
import type { Character } from "@/types/character";
import { ArrowLeft } from "lucide-react";

export default function AdvancedSearchPage() {
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);
  const characters: Character[] = useSelector(selectFilteredCharacters);
  const favorites: Character[] = useSelector(selectFilteredFavorites);

  // Eliminar duplicados: solo mostrar personajes que NO son favoritos
  const favoriteIds = new Set(favorites.map((fav) => fav.id));
  const nonFavoriteCharacters = characters.filter(
    (char) => !favoriteIds.has(char.id)
  );

  const filtersCount = [
    filters.search && filters.search !== "",
    filters.status !== "all",
    filters.species !== "all",
    filters.gender !== "all",
    filters.character !== "all",
  ].filter(Boolean).length;

  const showFavorites =
    filters.character === "starred" || filters.character === "all";
  const showOthers =
    filters.character === "others" || filters.character === "all";

  const renderCharacterItem = (char: Character) => (
    <li
      key={char.id}
      onClick={() => navigate(`/character/${char.id}`)}
      className="flex items-center gap-3 p-2 rounded mb-1 hover:bg-gray-100 cursor-pointer"
    >
      <img
        src={char.image}
        alt={char.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {char.id} {char.name}
        </p>
        <p className="text-xs text-gray-500">{char.species}</p>
      </div>
      {/* Evitar que FavoritesComponent dispare el navigate */}
      <div onClick={(e) => e.stopPropagation()}>
        <FavoritesComponent
          itemId={char.id}
          itemName={char.name}
          itemImage={char.image}
          itemGender={char.gender}
          itemSpecies={char.species}
          itemStatus={char.status}
          itemOccupation={char.occupation}
        />
      </div>
    </li>
  );

  return (
    <div className="p-4">
      <div className="flex items-center px-4 py-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-700 hover:text-primary-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold ml-4 flex-grow">
          Advanced Search
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Done
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {filtersCount} filter{filtersCount === 1 ? "" : "s"} applied. Results:{" "}
        {favorites.length + nonFavoriteCharacters.length}
      </div>

      {showFavorites && favorites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            FAVORITES ({favorites.length})
          </h2>
          <ul className="divide-y divide-gray-200">
            {favorites.map(renderCharacterItem)}
          </ul>
        </div>
      )}

      {showOthers && nonFavoriteCharacters.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            CHARACTERS ({nonFavoriteCharacters.length})
          </h2>
          <ul className="divide-y divide-gray-200">
            {nonFavoriteCharacters.map(renderCharacterItem)}
          </ul>
        </div>
      )}

      {!favorites.length && !nonFavoriteCharacters.length && (
        <p className="text-gray-600">No characters match your filters.</p>
      )}
    </div>
  );
}
