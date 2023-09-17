// SearchInput.tsx
import React from "react";
import { CiSearch } from "react-icons/ci";
import { useFileContext } from "../../context";
import "./search.css";

const SearchInput: React.FC = () => {
  const { searchTerm, updateSearchTerm } = useFileContext();

  return (
    <div className="search-input">
      <CiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
