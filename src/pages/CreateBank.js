import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import create_bank_cat from "../assets/images/create-bank-cat.jpg";

const CreateBank = () => {
  const [formData, setFormData] = useState({
    name: "На ",
    goal_amount: 0,
  });

  const [redirect, setRedirect] = useState(false);
  const [isNameEntered, setIsNameEntered] = useState(false);

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, name: newName }));
    setIsNameEntered(newName.trim() !== "" && newName.trim() !== "На");
  };
  
  const handleChangeGoalAmount = (e) => {
    const newGoalAmount = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, goal_amount: newGoalAmount }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/savings" />;
  }

  return (
    <form className="create-bank" onSubmit={handleSubmit}>
      <div className="header">
        <NavLink className="back-btn" to="/savings">
          -
        </NavLink>
        <img src={create_bank_cat} alt="cat"></img>
      </div>
      <div className="input-con">
        <label>На що накопичуємо?</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChangeName}
        ></input>
      </div>
      <div className="input-con">
        <label>Бажана сума накопичення?</label>
        <input
          name="goal_amount"
          value={formData.goal_amount}
          onChange={handleChangeGoalAmount}
        ></input>
      </div>
      <button type="submit" className="submit-btn" disabled={!isNameEntered}>
        Створити банку
      </button>
    </form>
  );
};

export default CreateBank;
