import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";
import charactersReducer from "./charactersSlice";
import favoritesReducer from "./favoritesSlice";
//import charactersReducer from "./charactersSlice"; // si ya lo tienes
//import favoritesReducer from "./favoritesSlice"; // si tienes favoritos en redux

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    characters: charactersReducer,
    favorites: favoritesReducer,
    //characters: charactersReducer, // si tienes uno
    // favorites: favoritesReducer, // si tienes uno
  },
});

// 👇 Aquí está lo importante
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
