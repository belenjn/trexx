import React from "react";
import "./Searcher.css";
import searchIcon from "../../assets/search.png";

export const Searcher = () => {
  return (
    <div className="searcher-container">
      <div className="searcher-input-container">
        <img className="search-icon" src={searchIcon} alt="Search Icon" />
        <input type="text" placeholder="Search artists:" />
      </div>
    </div>
  );
};
