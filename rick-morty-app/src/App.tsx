import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CharacterPage from "./pages/CharacterPage";
import FiltersPage from "./pages/FiltersPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CharacterPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/filters" element={<FiltersPage />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
