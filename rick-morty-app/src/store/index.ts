import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";
import charactersReducer from "./charactersSlice";
import favoritesReducer from "./favoritesSlice";
import commentsReducer from "./slices/commentsSlice";
import hiddenCharactersReducer from "./slices/hiddenCharactersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    characters: charactersReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    hiddenCharacters: hiddenCharactersReducer,
  },
});

// 👇 Aquí está lo importante
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
