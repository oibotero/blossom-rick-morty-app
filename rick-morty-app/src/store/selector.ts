import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const selectCharacters = (state: RootState) => state.characters.list;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFilters = (state: RootState) => state.filters;

export const makeSelectCommentsByCharacterId = () =>
  createSelector(
    [
      (state: RootState) => state.comments.commentsByCharacter,
      (_: RootState, characterId: number | null) => characterId,
    ],
    (commentsByCharacter, characterId) =>
      (characterId && commentsByCharacter[characterId]) || []
  );

export const selectFilteredCharacters = createSelector(
  [selectCharacters, selectFilters],
  (characters, filters) => {
    console.log("RAW CHARACTERS:", characters);
    if (!Array.isArray(characters)) return [];

    return characters
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
