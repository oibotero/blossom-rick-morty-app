/*import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FavoriteItem = {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  occupation: string;
};

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  isFavorited: (id: number) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    if (!favorites.find((fav) => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorited = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorited(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorited,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook para usar el contexto
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
*/
