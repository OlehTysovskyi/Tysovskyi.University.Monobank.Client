import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useBankService } from "../services/bankService";
import BackButton from "../components/BackButton";
import bankImage from "../assets/images/bank.jpg";

const Bank = () => {
  const { id } = useParams();
  const { getBankData } = useBankService();
  const [bankData, setBankData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBankData(id);
        setBankData(data.name);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id, getBankData]);

  return (
    <div className="bank">
      <BackButton to="/savings" color="white" />
      <div className="bank-container">
        <div className="info">
          <div className="name">{bankData}</div>
          <div className="balance">{} ₴</div>
          <div className="statistics">
            Знято {} ₴ | Поповнено {} ₴
          </div>
        </div>

        <img src={bankImage} alt="bank" />

        <div className="options">
          <NavLink to="/deposit">
            <div className="btn">+</div>
            <p>Поповнити</p>
            <p>банку</p>
          </NavLink>
          <NavLink to="/withdraw">
            <div className="btn">-</div>
            <p>Зняти</p>
            <p>з банки</p>
          </NavLink>
          <NavLink to="/break">
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
