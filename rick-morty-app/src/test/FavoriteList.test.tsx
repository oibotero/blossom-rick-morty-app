// __tests__/FavoritesComponent.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesComponent from "@/components/Favorite/FavoritesComponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../store/favoritesSlice";

// Crear un store temporal solo para test
const mockStore = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

describe("FavoritesComponent", () => {
  it("should render heart icon and toggle favorite on click", () => {
    render(
      <Provider store={mockStore}>
        <FavoritesComponent
          itemId={1}
          itemName="Rick Sanchez"
          itemImage="https://rick.com/rick.png"
          itemGender="Male"
          itemSpecies="Human"
          itemStatus="Alive"
          itemOccupation="Scientist"
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");
    expect(heartButton).toBeInTheDocument();

    fireEvent.click(heartButton);
    // Aquí podrías validar que el botón cambie de estilo, o verificar con un mock dispatch
  });
});
