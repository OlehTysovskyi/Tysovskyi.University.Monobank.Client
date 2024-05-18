import React from "react";
import { NavLink, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import bank from "../assets/images/bank.jpg";

const Bank = () => {
  const { id } = useParams();

  return (
    <div className="bank">
      <BackButton to="/savings" color="white" />
      <div className="bank-container">
        <div className="info">
          <div className="name">На машину{id}</div>
          <div className="divider"></div>
          <div className="balance">1500{} ₴</div>
          <div className="statistics">
            Знято{1500} ₴ | Поповнено {2000} ₴
          </div>
        </div>

        <img src={bank} alt="cat"></img>

        <div className="options">
          <NavLink>
            <div className="btn">+</div>
            <p>Поповнити</p>
            <p>банку</p>
          </NavLink>
          <NavLink>
            <div className="btn">-</div>
            <p>Зняти</p>
            <p>з банки</p>
          </NavLink>
          <NavLink>
            <div className="btn">||</div>
            <p>Розбити</p>
            <p>банку</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Bank;
