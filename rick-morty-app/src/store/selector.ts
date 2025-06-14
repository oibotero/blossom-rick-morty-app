import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const selectCharacters = (state: RootState) => state.characters.list;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFilters = (state: RootState) => state.filters;

export const selectFilteredCharacters = createSelector(
  [selectCharacters, selectFavorites, selectFilters],
  (characters, favorites, filters) => {
    const favoriteIds = new Set(favorites.map((f) => f.id));

    return characters
      .filter((char) => {
        // Excluir favoritos si el filtro es "others"
        if (filters.character === "others" && favoriteIds.has(char.id))
          return false;
        if (filters.character === "starred" && !favoriteIds.has(char.id))
          return false;
        return true;
      })
      .filter((char) =>
        filters.search
          ? char.name.toLowerCase().includes(filters.search.toLowerCase())
          : true
      )
      .filter(
        (char) =>
          filters.species === "all" ||
          char.species.toLowerCase() === filters.species
      )
      .filter(
        (char) =>
          filters.status === "all" ||
          char.status.toLowerCase() === filters.status
      )
      .filter(
        (char) =>
          filters.gender === "all" ||
          char.gender.toLowerCase() === filters.gender
      );
  }
);

export const selectFilteredFavorites = createSelector(
  [selectFavorites, selectFilters],
  (favorites, filters) =>
    favorites
      .filter((char) =>
        filters.search
          ? char.name.toLowerCase().includes(filters.search.toLowerCase())
          : true
      )
      .filter(
        (char) =>
          filters.species === "all" ||
          char.species.toLowerCase() === filters.species
      )
      .filter(
        (char) =>
          filters.status === "all" ||
          char.status.toLowerCase() === filters.status
      )
      .filter(
        (char) =>
          filters.gender === "all" ||
          char.gender.toLowerCase() === filters.gender
      )
);
