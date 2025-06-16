// src/store/slices/hiddenCharactersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = JSON.parse(
  localStorage.getItem("hiddenCharacters") || "[]"
);

const hiddenCharactersSlice = createSlice({
  name: "hiddenCharacters",
  initialState,
  reducers: {
    hideCharacter: (state, action: PayloadAction<number>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        localStorage.setItem("hiddenCharacters", JSON.stringify(state));
      }
    },
    showCharacter: (state, action: PayloadAction<number>) => {
      const newState = state.filter((id) => id !== action.payload);
      localStorage.setItem("hiddenCharacters", JSON.stringify(newState));
      return newState;
    },
    clearHiddenCharacters: () => {
      localStorage.removeItem("hiddenCharacters");
      return [];
    },
  },
});

export const { hideCharacter, showCharacter, clearHiddenCharacters } =
  hiddenCharactersSlice.actions;

export default hiddenCharactersSlice.reducer;
