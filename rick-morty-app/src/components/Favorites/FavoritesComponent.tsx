import React from "react";
import { useFavorites } from "./FavoritesContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FavoritesComponentProps {
  itemId: number;
  itemName: string;
  itemImage: string;
  itemGender: string;
  itemSpecies: string;
  itemStatus: string;
  itemOccupation: string;
}

const FavoritesComponent: React.FC<FavoritesComponentProps> = ({
  itemId,
  itemName,
  itemImage,
  itemGender,
  itemSpecies,
  itemStatus,
  itemOccupation,
}) => {
  const { favorites, addFavorite, removeFavorite, isFavorited } =
    useFavorites();

  const favorited = isFavorited(itemId);

  const handleClick = () => {
    if (favorited) {
      removeFavorite(itemId);
    } else {
      addFavorite({
        id: itemId,
        name: itemName,
        image: itemImage,
        gender: itemGender,
        species: itemSpecies,
        status: itemStatus,
        occupation: itemOccupation,
      });
    }
  };

  return (
    <div className="">
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={(e) => {
          e.stopPropagation(); // 👈 evita que se dispare el clic del contenedor
          handleClick(); // llama tu lógica para agregar/remover favorito
        }}
        className={`ml-auto p-2 rounded-full bg-white stroke-none transition-colors duration-200
    ${favorited ? "text-secondary-600" : "bg-gray-200 text-gray-500"}`}
      >
        <Heart className="w-5 h-5 stroke-1" />
      </motion.button>
    </div>
  );
};

export default FavoritesComponent;
