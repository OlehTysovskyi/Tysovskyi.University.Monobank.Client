import React, { useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import { useAuth } from "../contexts/authContext";
import { useUserService } from "../services/userService";

const TransactionHistory = () => {
  const { currentUser, setCurrentCard } = useAuth();
  const [transfers, setTransfers] = useState([]);
  const { getUserTransfers } = useUserService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = currentUser ? JSON.parse(currentUser).id : null;
        const transfersData = await getUserTransfers(userId);
        setTransfers(transfersData || null);
      } catch (error) {
        console.error("Error fetching user transfers:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleTransferClick = (card) => {
    setCurrentCard(JSON.stringify(card));
  };

  return (
    <div className="trans-hist">
      <div className="header">
        <div className="header-but">=</div>
        <div className="">Історія</div>
        <div className="header-but">o</div>
      </div>
      {transfers === null ? (
        <div className="alter-text">
          Поповення та перекази
          <br />
          власних коштів - без комісії
        </div>
      ) : (
        transfers.map((transfer) => (
          <TransactionItem
            key={transfer.id}
            transfer={transfer}
            onClick={handleTransferClick}
          />
        ))
      )}
    </div>
  );
};

export default TransactionHistory;
