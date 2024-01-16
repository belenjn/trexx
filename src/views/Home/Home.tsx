import React from "react";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";

//TODO: revisar todos los strings, incluso de errores para pasarlos a strings.ts

export const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="home-container">
        <label className="home-search-label">Search results for:</label>
      </div>
    </div>
  );
};
