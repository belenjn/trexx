import { useState } from "react";
import searchIcon from "../../assets/search.png";
import { strings } from "../../utils/strings";
import { fetchData } from "../../utils/fetchData";
import { useData } from "../../context/DataContext";

import "./Searcher.css";

export const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useData();

  const handleSearch = async () => {
    try {
      const response = await fetchData(searchTerm, "search");
      dispatch({ type: "SET_DATA", payload: response?.data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searcher-container">
      <img className="search-icon" src={searchIcon} alt="Search Icon" />
      <input
        type="text"
        placeholder={`${strings.searcher.placeholder}`}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
