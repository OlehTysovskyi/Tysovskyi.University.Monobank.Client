import React from "react";
import { NavLink } from "react-router-dom";

const Savings = () => {
  return (
    <div className="savings">
      <div className="header">
        Накопичено
        <div className="balance">{0.01}₴</div>
      </div>
      <div className="container">
        <NavLink className="create-bank" to="/create-bank">
          <div className="icon" />
          <div>Відкрити <br />банку</div>
        </NavLink>
        Банки
        <NavLink className="bank">
          <div className="icon" />
          <div className="info">
            <div className="name">На життя</div>
            <div className="amount">Накопичено {3984.03}</div>
          </div>
        </NavLink>
        <NavLink className="bank">
          <div className="icon" />
          <div className="info">
            <div className="name">На машину</div>
            <div className="amount">Накопичено {3984.03}</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Savings;
