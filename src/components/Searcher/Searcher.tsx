import React, { useState } from "react";
import "./Searcher.css";
import searchIcon from "../../assets/search.png";
import { strings } from "../../utils/strings";
import { fetchData } from "../../utils/fetchData";
import { useData } from "../../context/DataContext";

export const Searcher = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useData();

  const handleSearch = async () => {
    try {
      const response = await fetchData(searchTerm, "search");
      dispatch({ type: "SET_DATA", payload: response?.data });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  console.log(state.data?.data, "estado");

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
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
