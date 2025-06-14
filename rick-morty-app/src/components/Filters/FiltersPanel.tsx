import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/setFilters";

export default function FiltersPanel() {
  const dispatch = useDispatch();

  const [character, setCharacter] = useState<"all" | "starred" | "others">(
    "all"
  );
  const [species, setSpecies] = useState<"all" | "human" | "alien">("all");
  const [status, setStatus] = useState<"all" | "alive" | "dead" | "unknown">(
    "all"
  );
  const [gender, setGender] = useState<
    "all" | "male" | "female" | "genderless" | "unknown"
  >("all");

  const applyFilters = () => {
    dispatch(setFilters({ character, species, status, gender }));
  };

  return (
    <div className="grid gap-4 mb-6">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Character Type</label>
        <select
          className="p-2 border rounded"
          value={character}
          onChange={(e) => setCharacter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="starred">Starred</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Species</label>
        <select
          className="p-2 border rounded"
          value={species}
          onChange={(e) => setSpecies(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Status</label>
        <select
          className="p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Gender</label>
        <select
          className="p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="bg-secondary-600 text-white py-2 rounded hover:opacity-90 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
