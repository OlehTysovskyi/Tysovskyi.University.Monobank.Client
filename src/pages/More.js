import React from "react";
import { NavLink } from "react-router-dom";

const More = () => {
  return (
    <div className="more">
      <div className="header">Ще</div>
      <div className="container">
        <NavLink className="support" to="/support">
          <div className="icon" />
          <div>
            Зв'язок <br />
            з нами
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default More;
