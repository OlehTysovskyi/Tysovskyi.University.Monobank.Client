import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Dashboard = () => {
  const { setIsLoggedIn, currentUser, currentCard } = useAuth();

  const handleLogout = () => {
    throw Error;
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const user = currentUser ? JSON.parse(currentUser) : null;
  const card = currentCard ? JSON.parse(currentCard) : null;

  return (
    <div className="dashboard">
      <NavLink
        key=""
        to="/cards-and-accounts"
        className="cards-page-btn"
      ></NavLink>
      <div className="funds-box">
        <div className="funds">{card ? card.balance : 0} ₴</div>
        <div className="own-funds">
          Власні кошти: {card ? card.balance : 0} ₴
        </div>
        <div className="credit-limit">Кредитний ліміт: 0.00 ₴</div>
      </div>

      <button type="button" className="logout-btn" onClick={handleLogout}>
        Вийти з {user ? user.username : "user"}
      </button>

      <div className="menu">
        <div className="btn-container">
          <button className="btn">|</button>
          <div className="btn-text">
            Поповнити
            <br />
            свою картку
          </div>
        </div>
        <NavLink className="btn-container" key="transfer" to="/create-transfer">
          <button className="btn">&gt;</button>
          <div className="btn-text">
            Переказати
            <br />
            на картку
          </div>
        </NavLink>
        <NavLink className="btn-container" key="other-payment" to="/other-payments">
          <button className="btn">+</button>
          <div className="btn-text">
            Інші
            <br />
            платежі
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
