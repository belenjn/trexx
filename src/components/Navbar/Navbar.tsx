import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user_icon.png";
import menuIcon from "../../assets/menu.png";
import "./Navbar.css";
import { Searcher } from "../Searcher/Searcher";
import { strings } from "../../utils/strings";

interface Props {
  menuVisible: boolean;
  toggleMenu: () => void;
}

const MenuItems = [
  { label: `${strings.menuItems.home}` },
  { label: `${strings.menuItems.discover}`, style: { color: "#EF5466" } },
  { label: `${strings.menuItems.recents}` },
  { label: `${strings.menuItems.library}` },
  { label: <img alt="user-icon" src={userIcon} className="menu-icon" /> },
];

const MobileMenu = ({ menuVisible, toggleMenu }: Props) => (
  <>
    <div className="menu-icon" onClick={toggleMenu}>
      {menuVisible ? (
        <>&times;</>
      ) : (
        <img alt="menu-icon" src={menuIcon} className="menu-icon-hamburger" />
      )}
    </div>
    {menuVisible && (
      <div className="dropdown-menu">
        {MenuItems.map((item, index) => (
          <div key={index} className="menu-item" style={item.style}>
            <label>{item.label}</label>
          </div>
        ))}
      </div>
    )}
  </>
);

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav-container">
      <div className="searcher-logo-container">
        <img alt="deezer-logo" src={logo} className="logo" />
        <Searcher />
      </div>

      {isMobile ? (
        <div className="menu-container">
          <MobileMenu menuVisible={menuVisible} toggleMenu={toggleMenu} />
        </div>
      ) : (
        <div className="menu-container">
          {MenuItems.map((item, index) => (
            <div key={index} className="menu-item" style={item.style}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
