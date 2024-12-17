import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMangaTitles } from "../../reduces/mangaReduces";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      dispatch(getMangaTitles(searchQuery));
    }
  };

  return (
    <div className="search-input-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Cerca manga..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Cerca
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
