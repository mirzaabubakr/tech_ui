import React, { useState } from "react";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="topbar">
      <div className="container">
        <div className="logo">
          <a href="#" className="text-lg font-bold">
            Logo
          </a>
        </div>
        <div className="menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hamburger-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <ul className={`menu-list ${isMenuOpen ? "open" : "closed"}`}>
            <li>
              <a href="#" className="menu-item">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="menu-item">
                About
              </a>
            </li>
            <li>
              <a href="#" className="menu-item">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="menu-item">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="menu-item">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="menu-item">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
