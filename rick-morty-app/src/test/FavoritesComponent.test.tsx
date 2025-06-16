import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FavoritesComponent from "@/components/Favorite/FavoritesComponent";
import favoritesReducer from "../store/favoritesSlice";

const mockStore = configureStore({
  reducer: { favorites: favoritesReducer },
});

describe("FavoritesComponent", () => {
  it("should render heart icon and toggle favorite on click", () => {
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

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button); // esto debería agregar o quitar de favoritos
  });
});
