import React from "react";
import noResultsImage from "../../assets/no_results.jpg";
import "./NoResults.css";
import { strings } from "../../utils/strings";

export const NoResults = () => {
  return (
    <div className="noResults-container">
      <h2>{strings.noResults.noResults}</h2>
      <img
        alt="No results found"
        src={noResultsImage}
        className="noResults-image"
      />
    </div>
  );
};
