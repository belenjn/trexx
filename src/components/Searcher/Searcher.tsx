import React, { useState } from "react";
import "./Searcher.css";
import searchIcon from "../../assets/search.png";
import { strings } from "../../utils/strings";

export const Searcher = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`searcher-container ${expanded ? "expanded" : ""}`}>
      <img
        className={`search-icon ${expanded ? "hidden" : ""}`}
        src={searchIcon}
        alt="Search Icon"
        onClick={toggleInput}
      />
      <input
        type="text"
        placeholder={`${strings.searcher.placeholder}`}
        className={expanded ? "expanded" : ""}
      />
    </div>
  );
};
