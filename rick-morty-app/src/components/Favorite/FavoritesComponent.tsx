// src/components/Favorite/FavoritesComponent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleFavorite } from "../../store/favoritesSlice";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FavoritesComponentProps {
  itemId: string;
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
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorited = favorites.some((char) => char.id === itemId);

  const handleClick = () => {
    dispatch(
      toggleFavorite({
        id: itemId,
        name: itemName,
        image: itemImage,
        gender: itemGender,
        species: itemSpecies,
        status: itemStatus,
        occupation: itemOccupation,
      })
    );
  };

  return (
    <motion.button
      whileTap={{ scale: 1.3 }}
      onClick={(e) => {
        e.stopPropagation();
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
