import React, { useState } from "react";
import "./searchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
