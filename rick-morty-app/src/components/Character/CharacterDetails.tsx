// src/components/CharacterDetails.tsx
import React, { useState } from "react";
import { empty, useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_ID } from "../../graphql/getCharacteresById";
import type { Character } from "../../types/character";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import { addComment } from "../../store/slices/commentsSlice";
import { useMemo } from "react";
import { makeSelectCommentsByCharacterId } from "@/store/selector";
import { hideCharacter } from "../../store/slices/hiddenCharactersSlice";

interface Props {
  characterId: number | null;
}

export default function CharacterDetails({ characterId }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const selectComments = useMemo(makeSelectCommentsByCharacterId, []);
  const comments = useSelector((state: RootState) =>
    selectComments(state, characterId)
  );

  const [commentText, setCommentText] = useState("");

  const { data, loading, error } = useQuery<{ character: Character }>(
    GET_CHARACTER_BY_ID,
    {
      variables: { id: characterId?.toString() },
      skip: !characterId,
    }
  );

  const character = data?.character;
  const isFavorite =
    character && favorites.some((fav) => fav.id === character.id);

  const handleFavoriteToggle = () => {
    if (!character) return;

    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  const handleAddComment = () => {
    if (character && commentText.trim()) {
      dispatch(addComment({ characterId: character.id, text: commentText }));
      setCommentText("");
    }
  };

  if (!characterId || loading) {
    return (
      <div className="w-full md:w-2/3 p-6 overflow-y-auto text-gray-500 italic text-center">
        {loading
          ? "Cargando personaje..."
          : "Selecciona un personaje para ver detalles."}
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="w-full md:w-2/3 p-6 overflow-y-auto text-red-500 italic text-center">
        Error cargando el personaje.
      </div>
    );
  }

  return (
    <div className={` ${!characterId ? "hidden md:block" : ""}`}>
      <div className="sm:flex-row sm:items-start gap-6">
        {/* Imagen y botón de favorito */}
        <div className="relative w-24 h-24 shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover rounded-full border-4 border-primary-100 shadow-md"
          />
          <motion.button
            role="button"
            aria-label="Toggle Favorite"
            whileTap={{ scale: 1.2 }}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow transition-colors"
            onClick={handleFavoriteToggle}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? "fill-secondary-600 stroke-none" : "text-gray-300"
              }`}
            />
          </motion.button>

          {/* Botón ocultar */}
          <motion.button
            role="button"
            aria-label="Hide Character"
            whileTap={{ scale: 1.2, rotate: -15 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              dispatch(hideCharacter(Number(character.id)));
              navigate("/");
            }}
            className="absolute bottom-1 left-1 bg-white p-1 rounded-full shadow transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" />
          </motion.button>
        </div>

        {/* Información textual */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>

          <div>
            <p className="text font-semibold text-gray-800">Species</p>
            <p className="text-base text-gray-500">{character.species}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Status</p>
            <p className="text-base text-gray-500">{character.status}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Occupation</p>
            <p className="text-base text-gray-500">Princess</p>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Comments</h3>
        <ul className="space-y-2 mb-3">
          {comments.map((c, i) => (
            <li
              key={i}
              className="text-sm text-gray-800 bg-gray-100 p-2 rounded"
            >
              {c.text}
              <div className="text-xs text-gray-500">
                {new Date(c.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          onClick={handleAddComment}
          className="mt-2 bg-primary-600 text-white px-4 py-1 rounded hover:bg-primary-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
