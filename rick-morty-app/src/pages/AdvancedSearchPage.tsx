import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredCharacters, selectFilters } from "@/store/selector";
import FavoritesComponent from "@/components/Favorite/FavoritesComponent";
import { useNavigate } from "react-router-dom";
import type { Character } from "@/types/character";
import { ArrowLeft } from "lucide-react";
import { RootState } from "@/store";

export default function AdvancedSearchPage() {
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);
  const characters: Character[] = useSelector(selectFilteredCharacters) || [];
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const hiddenIds = useSelector((state: RootState) => state.hiddenCharacters);

  // Separar favoritos de no favoritos
  const favoriteIds = new Set(favorites.map((fav: Character) => fav.id));
  const favoriteCharacters = characters.filter((char) =>
    favoriteIds.has(char.id)
  );
  const nonFavoriteCharacters = characters.filter(
    (char) => !favoriteIds.has(char.id)
  );

  const visibleCharactersFavorites = favoriteCharacters.filter(
    (char) => !hiddenIds.includes(Number(char.id))
  );

  const visibleCharacters = nonFavoriteCharacters.filter(
    (char) => !hiddenIds.includes(Number(char.id))
  );
  const totalFilteredCharacters =
    visibleCharactersFavorites.length + visibleCharacters.length;

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
      className="flex items-center gap-3 pt-2 rounded  hover:bg-gray-100 cursor-pointer"
    >
      <img
        src={char.image}
        alt={char.name}
        className="w-10 h-10 rounded-full object-cover mb-1"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {char.name}
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
        />
      </div>
    </li>
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
          Advanced Search
        </h2>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-lg font-semibold text-primary-700 px-4 py-2 rounded-lg  hover:text-primary-600 transition z-10"
        >
          Done
        </button>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4 px-4 py-4 border-b">
        <h2 className="text-blue-700 text-lg font-semibold">
          {totalFilteredCharacters} Results
        </h2>
        <h2 className="text-lg font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full inline-block">
          {filtersCount} Filter{filtersCount === 1 ? "" : "s"}
        </h2>
      </div>

      {showFavorites && visibleCharactersFavorites.length > 0 && (
        <div className="mb-6 divide-y divide-gray-200">
          <h2 className="text-sm font-semibold text-gray-600 mb-2 px-4">
            STARRED CHARACTERS ({visibleCharactersFavorites.length})
          </h2>
          <ul className="divide-y divide-gray-200 list-none px-4">
            {visibleCharactersFavorites.map(renderCharacterItem)}
          </ul>
        </div>
      )}
      {showOthers && visibleCharacters.length > 0 && (
        <div className="mb-6 divide-y divide-gray-200">
          <h2 className="text-sm font-semibold text-gray-600 mb-2 px-4">
            CHARACTERS ({visibleCharacters.length})
          </h2>
          <ul className="divide-y divide-gray-200 list-none px-4">
            {visibleCharacters.map(renderCharacterItem)}
          </ul>
        </div>
      )}
      {!visibleCharactersFavorites.length && !visibleCharacters.length && (
        <p className="text-gray-600">No characters match your filters.</p>
      )}
    </div>
  );
}
