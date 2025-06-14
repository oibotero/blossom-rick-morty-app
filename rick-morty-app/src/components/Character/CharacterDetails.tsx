// src/components/CharacterDetails.tsx
import React, { useEffect, useState } from "react";
import { useFavorites } from "../Favorites/FavoritesContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  characterId: number | null;
}

export default function CharacterDetails({ characterId }: Props) {
  const [character, setCharacter] = useState<any | null>(null);
  const { favorites, removeFavorite, addFavorite } = useFavorites();

  useEffect(() => {
    if (!characterId) return;
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [characterId]);

  const isFavorite = favorites.some((fav) => fav.id === character?.id);

  if (!character) {
    return (
      <div className="w-full md:w-2/3 p-6 overflow-y-auto text-gray-500 italic text-center">
        Select a character to view details.
      </div>
    );
  }

  return (
    <div
      className={`sm:flex-row sm:items-start gap-6 ${
        !characterId ? "hidden md:block" : ""
      }`}
    >
      <div className="sm:flex-row sm:items-start gap-6">
        {/* Image & Heart */}
        <div className="relative w-24 h-24 shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover rounded-full border-4 border-primary-100 shadow-md"
          />
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow transition-colors"
            onClick={() =>
              isFavorite ? removeFavorite(character.id) : addFavorite(character)
            }
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? "fill-secondary-600 stroke-none" : "text-gray-300"
              }`}
            />
          </motion.button>
        </div>

        {/* Text Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>

          <div>
            <p className="text-sm font-semibold text-gray-500">Species</p>
            <p className="text-base text-gray-700">{character.species}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Status</p>
            <p className="text-base text-gray-700">{character.status}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Gender</p>
            <p className="text-base text-gray-700">{character.gender}</p>
          </div>
          {character.occupation && (
            <div>
              <p className="text-sm font-semibold text-gray-500">Occupation</p>
              <p className="text-base text-gray-700">{character.occupation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
