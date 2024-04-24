import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SuccessMessage = ({ message, visible }) => {
  return (
    <div className="success-msg" style={{ display: visible ? "block" : "none" }}>
      <div className="content-con">
        <div className="msg-con">{message}</div>
        <NavLink to="/more">
          <div className="close-btn">Закрити</div>
        </NavLink>
      </div>
    </div>
  );
};

export default SuccessMessage;
