// Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav-item">
        <NavLink
          to="/courses/basic"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Basic
        </NavLink>
      </div>

      <div className="nav-item">
        <NavLink
          to="/courses/intermediate"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Intermediate
        </NavLink>
      </div>

      <div className="nav-item">
        <NavLink
          to="/courses/advance"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Advance
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
