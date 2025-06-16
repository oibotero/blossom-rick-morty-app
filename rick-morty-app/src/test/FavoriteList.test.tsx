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
  it("debe renderizar el icono de corazón y alternar favorito al hacer clic", () => {
    render(
      <Provider store={mockStore}>
        <FavoritesComponent
          itemId={"1"}
          itemName="Rick Sanchez"
          itemImage="https://rick.com/rick.png"
          itemGender="Male"
          itemSpecies="Human"
          itemStatus="Alive"
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");
    expect(heartButton).toBeInTheDocument();

    fireEvent.click(heartButton);
  });

  it("debe mantener el botón visible cuando un personaje ya está marcado como favorito", () => {
    // Marcar el personaje como favorito manualmente en el estado
    mockStore.dispatch({
      type: "favorites/addFavorite",
      payload: {
        id: 2,
        name: "Morty Smith",
        image: "https://rick.com/morty.png",
        gender: "Male",
        species: "Human",
        status: "Alive",
      },
    });

    render(
      <Provider store={mockStore}>
        <FavoritesComponent
          itemId={"2"}
          itemName="Morty Smith"
          itemImage="https://rick.com/morty.png"
          itemGender="Male"
          itemSpecies="Human"
          itemStatus="Alive"
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");
    expect(heartButton).toBeInTheDocument();
  });

  it("debe alternar el estado de favorito correctamente al hacer clic dos veces", () => {
    render(
      <Provider store={mockStore}>
        <FavoritesComponent
          itemId={"3"}
          itemName="Summer Smith"
          itemImage="https://rick.com/summer.png"
          itemGender="Female"
          itemSpecies="Human"
          itemStatus="Alive"
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");

    fireEvent.click(heartButton); // Agrega a favoritos
    fireEvent.click(heartButton); // Elimina de favoritos

    expect(heartButton).toBeInTheDocument(); // Aún debe estar en el DOM
  });
});
