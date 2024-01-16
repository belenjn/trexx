import React from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Searcher } from "../Searcher/Searcher";

export const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="searcher-logo-container">
        <img alt="deezer-logo" src={logo} className="logo" />
        <Searcher />
      </div>
    </div>
  );
};
