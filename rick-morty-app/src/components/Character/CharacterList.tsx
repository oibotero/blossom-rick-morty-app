// src/components/CharacterList.tsx
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/getCharacteres";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SortAsc, SortDesc } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

import {
  setCharacters,
  setSearch,
  setSpeciesFilter,
  setCharacterFilter,
  toggleSortOrder,
} from "@/store/charactersSlice";
import { selectFilters } from "@/store/selector";

import Search from "../Search/Search";
import FavoriteList from "../Favorite/FavoriteList";
import FavoritesComponent from "../Favorite/FavoritesComponent";

import type { Character } from "@/types/character";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

export default function CharacterList({ onSelect, selectedId }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector(selectFilters);
  const hiddenIds = useSelector((state: RootState) => state.hiddenCharacters);
  const charactersState = useSelector((state: RootState) => state.characters);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const favoriteIds = new Set(favorites.map((fav) => String(fav.id)));

  // Obtener personajes desde GraphQL
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      name: charactersState.search,
      status: "",
      gender: "",
      species: "",
    },
  });

  const characters: Character[] = data?.characters?.results || [];

  // Actualizar store con los personajes obtenidos
  useEffect(() => {
    if (data?.characters?.results) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data, dispatch]);

  // Determinar filtros activos (priorizando los de filtersSlice si existen)
  const activeSearch = filters.search || charactersState.search;
  const activeSpeciesFilter =
    filters.species !== "all" ? filters.species : charactersState.speciesFilter;
  const activeCharacterFilter =
    filters.character !== "all"
      ? filters.character
      : charactersState.characterFilter;
  const activeStatusFilter =
    filters.status !== "all" ? filters.status : charactersState.statusFilter;
  const activeGenderFilter =
    filters.gender !== "all" ? filters.gender : charactersState.genderFilter;

  // Filtrado de personajes según filtros activos
  const filteredCharacters = characters.filter((char) => {
    const isFavorite = favoriteIds.has(String(char.id));

    if (isFavorite) return false;
    if (activeCharacterFilter === "starred") return false;
    if (activeCharacterFilter === "others" && isFavorite) return false;
    if (
      activeSpeciesFilter !== "all" &&
      char.species.toLowerCase() !== activeSpeciesFilter
    )
      return false;
    if (
      activeStatusFilter !== "all" &&
      char.status.toLowerCase() !== activeStatusFilter
    )
      return false;
    if (
      activeGenderFilter !== "all" &&
      char.gender.toLowerCase() !== activeGenderFilter
    )
      return false;
    if (
      activeSearch &&
      !char.name.toLowerCase().includes(activeSearch.toLowerCase())
    )
      return false;

    return true;
  });

  // Ordenar personajes por nombre asc/desc
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    return charactersState.sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Ocultar personajes marcados como ocultos
  const visibleCharacters = sortedCharacters.filter(
    (char) => !hiddenIds.includes(Number(char.id))
  );

  // Navegar según tamaño de pantalla
  const handleCharacterClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      navigate(`/character/${id}`);
    } else {
      onSelect(id);
    }
  };

  if (error) return <p>Error loading characters.</p>;

  const showFavorites =
    filters.character === "starred" || filters.character === "all";
  const showOthers =
    filters.character === "others" || filters.character === "all";

  return (
    <div className="w-full md:w-3/3 max-h-screen overflow-y-auto border-r border-gray-200 p-4 ml-0">
      {/* Botón de ordenamiento */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => dispatch(toggleSortOrder())}
          className="flex items-center gap-2 text-xl font-semibold text-black hover:text-primary-600 transition"
        >
          Rick and Morty list
          {charactersState.sortOrder === "asc" ? (
            <SortAsc className="w-5 h-5" />
          ) : (
            <SortDesc className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Buscador */}
      <Search
        searchInput={charactersState.search}
        setSearchInput={(value) => dispatch(setSearch(value))}
        setSearch={(value) => dispatch(setSearch(value))}
        setCharacterFilter={(value) => dispatch(setCharacterFilter(value))}
        setSpeciesFilter={(value) => dispatch(setSpeciesFilter(value))}
        updatePageNumber={() => {}}
      />

      {/* Lista de favoritos */}
      {showFavorites && (
        <FavoriteList onSelect={onSelect} selectedId={selectedId} />
      )}

      {/* Lista de personajes */}
      {showOthers && (
        <>
          <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-4 ml-2 sticky top-0 bg-white z-10">
            CHARACTERS ({visibleCharacters.length})
          </h2>

          {loading ? (
            <div className="flex justify-center my-6">
              <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : visibleCharacters.length === 0 ? (
            <p className="text-center text-red-500 font-semibold mt-4">
              No results found
            </p>
          ) : (
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
                        {char.name}
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
                    />
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          )}
        </>
      )}
    </div>
  );
}
