import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FavoritesProvider } from "./components/Favorites/FavoritesContext";

import CharacterList from "./components/Character/CharacterList";
import CharacterDetails from "./components/Character/CharacterDetails";
import CharacterPage from "./pages/CharacterPage";

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<CharacterPage />} />
            <Route path="/character/:id" element={<CharacterPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
