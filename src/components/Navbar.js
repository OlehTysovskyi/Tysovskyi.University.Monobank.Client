import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/images/close.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <NavLink key="account" to="/">
          <img
            className="nav-icon"
            src={homeIcon}
            width="30px"
            title="Cards"
            alt="Головна"
          />
        </NavLink>
        <img
          className="nav-icon"
          src={homeIcon}
          width="30px"
          title="Головна"
          alt="Головна"
        />
        <img
          className="nav-icon"
          src={homeIcon}
          width="30px"
          title="Головна"
          alt="Головна"
        />
        <img
          className="nav-icon"
          src={homeIcon}
          width="30px"
          title="Головна"
          alt="Головна"
        />
        <img
          className="nav-icon"
          src={homeIcon}
          width="30px"
          title="Головна"
          alt="Головна"
        />
        {/* <NavLink key="home" to="/">
          <img
            className="nav-icon"
            src={homeIcon}
            width="30px"
            title="Create account"
            alt="Головна"
          />
        </NavLink> */}
        {/* <NavLink key="home" to="/">
          <img
            className="nav-icon"
            src={homeIcon}
            width="30px"
            title="Головна"
            alt="Головна"
          />
        </NavLink>{" "}
        <NavLink key="home" to="/">
          <img
            className="nav-icon"
            src={homeIcon}
            width="30px"
            title="Головна"
            alt="Головна"
          />
        </NavLink>{" "}
        <NavLink key="home" to="/">
          <img
            className="nav-icon"
            src={homeIcon}
            width="30px"
            title="Головна"
            alt="Головна"
          />
        </NavLink> */}
      </nav>
    </>
  );
};

export default Navbar;
