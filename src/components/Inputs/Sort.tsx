// SortSelect.tsx
import React from "react";
import { useFileContext } from "../../context";
import "./sort.css";

const SortSelect: React.FC = () => {
  const { sortBy, updateSortBy } = useFileContext();

  return (
    <div className="sort-wrap">
      <select value={sortBy} onChange={(e) => updateSortBy(e.target.value)}>
        <option value="">Sort</option>
        <option value="name">By Name</option>
        <option value="timeCreated">By time created</option>
      </select>
      <div className="sort-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5.16669H2C1.72667 5.16669 1.5 4.94002 1.5 4.66669C1.5 4.39335 1.72667 4.16669 2 4.16669H14C14.2733 4.16669 14.5 4.39335 14.5 4.66669C14.5 4.94002 14.2733 5.16669 14 5.16669Z"
            fill="#96999C"
          />
          <path
            d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
            fill="#96999C"
          />
          <path
            d="M9.33329 11.8333H6.66663C6.39329 11.8333 6.16663 11.6066 6.16663 11.3333C6.16663 11.06 6.39329 10.8333 6.66663 10.8333H9.33329C9.60663 10.8333 9.83329 11.06 9.83329 11.3333C9.83329 11.6066 9.60663 11.8333 9.33329 11.8333Z"
            fill="#96999C"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortSelect;
