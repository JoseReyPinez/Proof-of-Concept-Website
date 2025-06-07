import React, { useState } from "react";
export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSearch(input.trim());
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Enter Pokémon name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "70%", fontSize: "16px" }}
      />
      <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
        Search
      </button>
    </form>
  );
}
