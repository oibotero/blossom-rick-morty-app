// src/store/filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  character: "all" | "starred" | "others";
  species: "all" | "human" | "alien";
  status: "all" | "alive" | "dead" | "unknown";
  gender: "all" | "male" | "female" | "genderless" | "unknown";
  search: string;
}

const initialState: FiltersState = {
  character: "all",
  species: "all",
  status: "all",
  gender: "all",
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCharacterFilter: (
      state,
      action: PayloadAction<FiltersState["character"]>
    ) => {
      state.character = action.payload;
    },
    setSpeciesFilter: (
      state,
      action: PayloadAction<FiltersState["species"]>
    ) => {
      state.species = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<FiltersState["status"]>) => {
      state.status = action.payload;
    },
    setGenderFilter: (state, action: PayloadAction<FiltersState["gender"]>) => {
      state.gender = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setCharacterFilter,
  setSpeciesFilter,
  setStatusFilter,
  setGenderFilter,
  setSearch,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
