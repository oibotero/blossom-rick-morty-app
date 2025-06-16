import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterDetails from "../components/Character/CharacterDetails";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CHARACTER_BY_ID } from "../graphql/getCharacteresById";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../store/favoritesSlice";
import commentsReducer from "../store/slices/commentsSlice";

// Mock Redux store
const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      comments: commentsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MockedProvider mocks={[]} addTypename={false}>
        {ui}
      </MockedProvider>
    </Provider>
  );
};

describe("CharacterDetails", () => {
  test("muestra estado de carga cuando loading es true", () => {
    renderWithProviders(<CharacterDetails characterId={1} />);
    expect(screen.getByText(/Cargando personaje.../i)).toBeInTheDocument();
  });

  test("renderiza correctamente los detalles de un personaje", async () => {
    const characterMock = {
      request: {
        query: GET_CHARACTER_BY_ID,
        variables: { id: "1" },
      },
      result: {
        data: {
          character: {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            occupation: "Scientist",
          },
        },
      },
    };

    render(
      <Provider
        store={configureStore({
          reducer: { favorites: favoritesReducer, comments: commentsReducer },
        })}
      >
        <MockedProvider mocks={[characterMock]} addTypename={false}>
          <CharacterDetails characterId={1} />
        </MockedProvider>
      </Provider>
    );

    // Espera al nombre
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText(/Species/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
  });

  test("permite marcar un personaje como favorito", async () => {
    const characterMock = {
      request: {
        query: GET_CHARACTER_BY_ID,
        variables: { id: "1" },
      },
      result: {
        data: {
          character: {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            __typename: "Character",
          },
        },
      },
    };

    render(
      <Provider
        store={configureStore({
          reducer: { favorites: favoritesReducer, comments: commentsReducer },
        })}
      >
        <MockedProvider mocks={[characterMock]} addTypename={false}>
          <CharacterDetails characterId={1} />
        </MockedProvider>
      </Provider>
    );

    // Espera a que se renderice el personaje
    const name = await screen.findByText("Rick Sanchez");
    expect(name).toBeInTheDocument();

    screen.debug();
    // Ahora sí busca el botón
    const favButton = screen.getByLabelText("Toggle Favorite");
    fireEvent.click(favButton);

    // Confirmación de que sigue en el DOM
    expect(favButton).toBeInTheDocument();
  });
});
