import React from "react";
import { NavLink } from "react-router-dom";

const BackButton = ({ to, color }) => {
  return (
    <NavLink className="back-btn" to={to} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 -960 960 960"
        width="32px"
        fill={color}
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </NavLink>
  );
};

export default BackButton;
