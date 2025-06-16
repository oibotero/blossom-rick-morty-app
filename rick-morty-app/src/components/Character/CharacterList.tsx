// src/components/CharacterList.tsx
import React from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/getCharacteres";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SortAsc, SortDesc } from "lucide-react";

import { selectFilteredCharacters, selectFilters } from "@/store/selector";
import Search from "../Search/Search";
import FavoriteList from "../Favorite/FavoriteList";
import FavoritesComponent from "../Favorite/FavoritesComponent";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

import { hideCharacter } from "../../store/slices/hiddenCharactersSlice";

import {
  setCharacters,
  setSearch,
  setSpeciesFilter,
  setCharacterFilter,
  toggleSortOrder,
} from "@/store/charactersSlice";
import { toggleFavorite } from "../../store/favoritesSlice";

import type { Character } from "@/types/character";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
  hideOnMobile?: boolean;
}

export default function CharacterList({ onSelect, selectedId }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);

  const hiddenIds = useSelector((state: RootState) => state.hiddenCharacters);

  const filtersFromCharacters = useSelector(
    (state: RootState) => state.characters
  );
  const filtersFromFiltersSlice = useSelector(selectFilters);

  // Usar los filtros de filtersSlice si alguno fue aplicado
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

  const {
    search,
    speciesFilter,
    characterFilter,
    statusFilter,
    genderFilter,
    sortOrder,
  } = useSelector((state: RootState) => state.characters);

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

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const favoriteIds = new Set(favorites.map((fav) => String(fav.id)));

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      name: search,
      status: "",
      gender: "",
      species: "",
    },
  });

  const characters: Character[] = data?.characters?.results || [];

  useEffect(() => {
    if (data?.characters?.results) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data, dispatch]);

  const filteredCharacters = characters.filter((char) => {
    const isFavorite = favoriteIds.has(String(char.id));

    // Ocultar favoritos
    if (isFavorite) return false;

    // Tipo de personaje
    if (activeCharacterFilter === "starred") return false;
    if (activeCharacterFilter === "others" && isFavorite) return false;

    // Especie
    if (
      activeSpeciesFilter !== "all" &&
      char.species.toLowerCase() !== activeSpeciesFilter
    ) {
      return false;
    }

    // Estado
    if (
      activeStatusFilter !== "all" &&
      char.status.toLowerCase() !== activeStatusFilter
    ) {
      return false;
    }

    // Género
    if (
      activeGenderFilter !== "all" &&
      char.gender.toLowerCase() !== activeGenderFilter
    ) {
      return false;
    }

    // Search
    if (
      activeSearch &&
      !char.name.toLowerCase().includes(activeSearch.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // const visibleCharacters = filteredFavorites.filter(
  //   (char) => !hiddenIds.includes(Number(char.id))
  // );

  const visibleCharacters = sortedCharacters.filter(
    (char) => !hiddenIds.includes(Number(char.id))
  );
  const handleCharacterClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      navigate(`/character/${id}`);
    } else {
      onSelect(id);
    }
  };

  if (error) return <p>Error loading characters.</p>;

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
    <div className="w-full md:w-3/3 max-h-screen overflow-y-auto border-r border-gray-200 p-4">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => dispatch(toggleSortOrder())}
          className="flex items-center gap-2 text-xl font-semibold text-primary-700 hover:text-primary-600 transition"
        >
          Rick and Morty List
          {sortOrder === "asc" ? (
            <SortAsc className="w-5 h-5" />
          ) : (
            <SortDesc className="w-5 h-5" />
          )}
        </button>
      </div>
      <Search
        searchInput={search}
        setSearchInput={(value) => dispatch(setSearch(value))}
        setSearch={(value) => dispatch(setSearch(value))}
        setCharacterFilter={(value) => dispatch(setCharacterFilter(value))}
        setSpeciesFilter={(value) => dispatch(setSpeciesFilter(value))}
        updatePageNumber={() => {}}
      />
      {showFavorites && (
        <FavoriteList onSelect={onSelect} selectedId={selectedId} />
      )}
      {showOthers && (
        <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-4 sticky top-0 bg-white z-10">
          CHARACTERS ({visibleCharacters.length})
        </h2>
      )}
      {loading && showOthers && (
        <div className="flex justify-center my-6">
          <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {visibleCharacters.length === 0 && showOthers && !loading && (
        <p className="text-center text-red-500 font-semibold mt-4">
          No results found
        </p>
      )}
      {showOthers && (
        <AnimatePresence>
          <ul className="divide-y divide-gray-200">
            {visibleCharacters.map((char) => (
              <motion.li
                key={char.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => handleCharacterClick(char.id, e)}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer mb-1 ${
                  selectedId === char.id
                    ? "bg-primary-100"
                    : "hover:bg-gray-100"
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
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      )}
    </div>
  );
}
