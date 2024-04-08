import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useUserService } from "../services/userService";

const CardsAndAccounts = () => {
  const { currentUser, setCurrentCard } = useAuth();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const { getUserCards } = useUserService();

  const user = JSON.parse(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsData = await getUserCards(user.id);
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    };

    fetchData();
  }, [user.id]);

  const formatCardNumber = (number) => {
    return number.replace(/\d{4}(?=.)/g, "$& ");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCurrentCard(JSON.stringify(card));
  };

  return (
    <div className="cards-and-accounts">
      <NavLink className="back-btn" to="/">
        -
      </NavLink>
      <div className="profile">
        <div className="avatar"></div>
        <div className="username">{user.username}</div>
      </div>
      <div className="cards-container">
        <div className="header">Картки та рахунки:</div>
        {cards.map((card) => (
          <NavLink key={card.id} to="/">
            <div
              className={`card ${
                selectedCard && selectedCard.id === card.id ? "selected" : ""
              } ${card.type === "BLACK" ? "black-card" : "white-card"}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="account-number">
                {formatCardNumber(card.number)}
              </div>
              <div>Баланс: {card.balance}₴</div>
            </div>
          </NavLink>
        ))}
        <NavLink
          to="/create-card-or-account"
          className="create-card-or-account-but"
        >
          + Відкрити картку або рахунок
        </NavLink>
      </div>
    </div>
  );
};

export default CardsAndAccounts;
