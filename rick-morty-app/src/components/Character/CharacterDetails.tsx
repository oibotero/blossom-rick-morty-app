// src/components/CharacterDetails.tsx
import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";

// GraphQL query
import { GET_CHARACTER_BY_ID } from "../../graphql/getCharacteresById";

// Tipado
import type { Character } from "../../types/character";
import type { RootState } from "../../store";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import { addComment } from "../../store/slices/commentsSlice";
import { hideCharacter } from "../../store/slices/hiddenCharactersSlice";
import { makeSelectCommentsByCharacterId } from "@/store/selector";

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

  // Obtener datos del personaje
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

  // Agregar o quitar personaje de favoritos
  const handleFavoriteToggle = () => {
    if (!character) return;
    isFavorite
      ? dispatch(removeFavorite(character.id))
      : dispatch(addFavorite(character));
  };

  // Agregar comentario
  const handleAddComment = () => {
    if (character && commentText.trim()) {
      dispatch(addComment({ characterId: character.id, text: commentText }));
      setCommentText("");
    }
  };

  // Vista de carga o estado vacío
  if (!characterId || loading) {
    return (
      <div className="w-full md:w-2/3 p-6 overflow-y-auto text-gray-500 italic text-center">
        {loading
          ? "Cargando personaje..."
          : "Selecciona un personaje para ver detalles."}
      </div>
    );
  }

  // Error al cargar o personaje no encontrado
  if (error || !character) {
    return (
      <div className="w-full md:w-2/3 p-6 overflow-y-auto text-red-500 italic text-center">
        Error cargando el personaje.
      </div>
    );
  }

  return (
    <div
      className={`w-full md:w-3/3 max-h-screen overflow-y-auto border-r border-gray-200 p-4 ${
        !characterId ? "hidden md:block" : ""
      }`}
    >
      <div className="sm:flex-row sm:items-start gap-6">
        {/* Imagen y botones de acción */}
        <div className="relative w-24 h-24 shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover rounded-full border-4 border-primary-100 shadow-md"
          />

          {/* Botón de favorito */}
          <motion.button
            role="button"
            aria-label="Toggle Favorite"
            whileTap={{ scale: 1.2, rotate: -15 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow transition-colors"
            onClick={handleFavoriteToggle}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? "fill-secondary-600 stroke-none" : "text-gray-300"
              }`}
            />
          </motion.button>

          {/* Botón ocultar personaje */}
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

        {/* Detalles del personaje */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>

          <div>
            <p className="text-sm font-semibold text-gray-800">Species</p>
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

        {/* Comentarios */}
        <h3 className="text-md font-semibold mb-2 mt-6">Comments</h3>
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

        {/* Input de comentario */}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border border-gray-300 p-2 rounded"
        />

        {/* Botón de envío */}
        <button
          onClick={handleAddComment}
          disabled={commentText.trim() === ""}
          className={`mt-2 px-4 py-1 rounded transition-colors ${
            commentText.trim() === ""
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
