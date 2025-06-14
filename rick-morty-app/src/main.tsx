import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apolloClient.ts";
import { Provider } from "react-redux";
//import { FavoritesProvider } from "../src/components/Favorite/FavoritesContext";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
