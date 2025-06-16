import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "@/types/character";

type CharacterFilterType = "all" | "starred" | "others";
type SpeciesType = "all" | "human" | "alien";
type StatusType = "all" | "alive" | "dead" | "unknown";
type GenderType = "all" | "male" | "female" | "genderless" | "unknown";
type SortOrder = "asc" | "desc";

interface CharactersState {
  list: Character[];
  search: string;
  speciesFilter: SpeciesType;
  characterFilter: CharacterFilterType;
  statusFilter: StatusType;
  genderFilter: GenderType;
  sortOrder: SortOrder;
}
const initialState: CharactersState = {
  list: [],
  characterFilter: "all",
  speciesFilter: "all",
  search: "",
  statusFilter: "all",
  genderFilter: "all",
  sortOrder: "asc",
};
const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.list = action.payload;
    },
    setCharacterFilter(
      state,
      action: PayloadAction<CharactersState["characterFilter"]>
    ) {
      state.characterFilter = action.payload;
    },
    setSpeciesFilter(
      state,
      action: PayloadAction<CharactersState["speciesFilter"]>
    ) {
      state.speciesFilter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<StatusType>) {
      state.statusFilter = action.payload;
    },
    setGenderFilter(state, action: PayloadAction<GenderType>) {
      state.genderFilter = action.payload;
    },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
  },
});

export const {
  setCharacters,
  setCharacterFilter,
  setSpeciesFilter,
  setSearch,
  setStatusFilter,
  setGenderFilter,
  toggleSortOrder,
} = charactersSlice.actions;

export default charactersSlice.reducer;
