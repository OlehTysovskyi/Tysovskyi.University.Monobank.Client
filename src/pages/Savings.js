import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useUserService } from "../services/userService";

const Savings = () => {
  const { currentUser } = useAuth();
  const user = JSON.parse(currentUser);

  const { getUserBanks } = useUserService();
  const [banks, setBanks] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const userBanks = await getUserBanks();
        console.error(userBanks);
        if (Array.isArray(userBanks)) {
          setBanks(userBanks);
          const total = userBanks.reduce(
            (sum, bank) => sum + parseFloat(bank.balance),
            0
          );
          setTotalBalance(total);
        } else {
          setBanks([]);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
        setBanks([]);
      }
    };

    fetchBanks();
  }, [user.id]);

  return (
    <div className="savings">
      <div className="header">
        Накопичено
        <div className="balance">{totalBalance.toFixed(2)}₴</div>
      </div>
      <div className="container">
        <NavLink className="create-bank" to="/create-bank">
          <div className="icon" />
          <div>
            Відкрити <br />
            банку
          </div>
        </NavLink>
        Банки
        {banks.map((bank) => (
          <NavLink key={bank.id} className="bank" to={`/bank/${bank.id}`}>
            <div className="icon" />
            <div className="info">
              <div className="name">{bank.name}</div>
              <div className="amount">Накопичено {bank.balance.toFixed(2)}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Savings;
