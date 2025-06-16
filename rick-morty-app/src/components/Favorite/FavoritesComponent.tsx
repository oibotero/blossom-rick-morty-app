import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleFavorite } from "../../store/favoritesSlice";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

// Props que recibe el componente de favorito
interface FavoritesComponentProps {
  itemId: string;
  itemName: string;
  itemImage: string;
  itemGender: string;
  itemSpecies: string;
  itemStatus: string;
}

const FavoritesComponent: React.FC<FavoritesComponentProps> = ({
  itemId,
  itemName,
  itemImage,
  itemGender,
  itemSpecies,
  itemStatus,
}) => {
  const dispatch = useDispatch();

  // Obtener lista de favoritos del estado global
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  // Verifica si el personaje actual está en favoritos
  const isFavorited = favorites.some((char) => char.id === itemId);

  // Maneja el clic en el botón para agregar/quitar de favoritos
  const handleClick = () => {
    dispatch(
      toggleFavorite({
        id: itemId,
        name: itemName,
        image: itemImage,
        gender: itemGender,
        species: itemSpecies,
        status: itemStatus,
      })
    );
  };

  return (
    <motion.button
      whileTap={{ scale: 1.3, rotate: -15 }} // Animación al hacer tap
      whileHover={{ scale: 1.1 }} // Animación al hacer hover
      onClick={(e) => {
        e.stopPropagation(); // Evita que el clic afecte a componentes padre
        handleClick();
      }}
      className={`ml-auto p-2 rounded-full bg-white transition-colors duration-200
        ${isFavorited ? "text-secondary-600" : "bg-gray-200 text-gray-500"}`}
    >
      <Heart
        className={`w-5 h-5 stroke-1 ${
          isFavorited ? "fill-secondary-600" : "fill-none"
        }`}
      />
    </motion.button>
  );
};

export default FavoritesComponent;
