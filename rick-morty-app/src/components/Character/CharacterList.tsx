// src/components/CharacterList.tsx
import React, { useEffect, useState } from "react";
import Search from "../Search";
import FavoritesComponent from "../Favorites/FavoritesComponent";
import FavoriteList from "../Favorites/FavoriteList";
import { useFavorites } from "../Favorites/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
  hideOnMobile?: boolean;
}

type InfoType = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type CharacterType = {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  occupation: string;
};

export default function CharacterList({ onSelect, selectedId }: Props) {
  const [pageNumber, updatePageNumber] = useState<number>(1);

  const [characterFilter, setCharacterFilter] = useState<
    "all" | "starred" | "others"
  >("all");
  const [speciesFilter, setSpeciesFilter] = useState<"all" | "human" | "alien">(
    "all"
  );

  const [status, updateStatus] = useState<string>("");
  const [gender, updateGender] = useState<string>("");
  const [species, updateSpecies] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { favorites } = useFavorites();

  const favoriteIds = new Set(favorites.map((fav: { id: number }) => fav.id));

  const [fetchedData, updateFetchedData] = useState<{
    info: InfoType;
    results: CharacterType[];
  }>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  });

  const { info, results } = fetchedData;

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(api);

        if (!res.ok) {
          updateFetchedData({
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
          });
          return;
        }

        const data = await res.json();
        updateFetchedData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        updateFetchedData({
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        });
      }
    })();
  }, [api]);

  const filteredCharacters = results.filter((char) => {
    const isFavorite = favoriteIds.has(char.id);

    // Filtrar por especie
    if (
      speciesFilter !== "all" &&
      char.species.toLowerCase() !== speciesFilter
    ) {
      return false;
    }

    // Filtrar por tipo de personaje
    if (characterFilter === "starred") return false; // se manejan aparte en FavoriteList
    if (characterFilter === "others" && isFavorite) return false;
    if (characterFilter === "all" && isFavorite) return false; // ocultar favoritos de la lista general

    // Buscar por nombre
    if (search && !char.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    return true;
  });

  const navigate = useNavigate();

  const handleCharacterClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Importante: evita que clics dentro del li (como el corazón) activen este

    if (window.innerWidth < 768) {
      navigate(`/character/${id}`);
    } else {
      onSelect(id);
    }
  };

  return (
    <div className="w-full md:w-3/3 max-h-screen overflow-y-auto border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-2 text-primary-700">
        Rick and Morty List
      </h2>

      <Search
        setSearch={setSearch}
        setCharacterFilter={setCharacterFilter}
        setSpeciesFilter={setSpeciesFilter}
        updatePageNumber={updatePageNumber}
      />

      <FavoriteList
        onSelect={onSelect}
        selectedId={selectedId}
        search={search}
        speciesFilter={speciesFilter}
        characterFilter={characterFilter}
      />

      <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-4 sticky top-0 bg-white z-10">
        CHARACTERS ({filteredCharacters.length})
      </h2>

      {filteredCharacters.length === 0 && (
        <p className="text-center text-red-500 font-semibold mt-4">
          No results found
        </p>
      )}

      <AnimatePresence>
        <ul className="divide-y divide-gray-200">
          {filteredCharacters.map((char) => (
            <motion.li
              key={char.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => handleCharacterClick(char.id, e)}
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
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}
