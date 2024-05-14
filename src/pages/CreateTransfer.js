import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../contexts/authContext";
import { useCardService } from "../services/cardService";
import { createTransfer } from "../services/transferService";

const CreateTransfer = () => {
  const { currentCard } = useAuth();
  const { updateBalance } = useCardService();

  const [formData, setFormData] = useState({
    sender_card_num: JSON.parse(currentCard).number,
    recipient_card_num: "",
    amount: 0,
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatingTransfer = async (e) => {
    e.preventDefault();

    if (formData.recipient_card_num === "") {
      alert("Уведіть номер картки");
      return;
    }

    if (formData.amount <= 0) {
      alert("Сума переказу повинна бути більша 0");
      return;
    }

    try {
      await updateBalance(formData);
      const shouldRedirect = await createTransfer(formData);
      setRedirect(shouldRedirect);
    } catch (error) {
      alert(error.message);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleCreatingTransfer} className="create-transfer">
      <div className="header">
        <BackButton to="/" color="white"/>
        <div className="text">Переказ на картку</div>
        <input
          type="text"
          name="recipient_card_num"
          value={formData.recipient_card_num}
          onChange={handleChange}
          placeholder="Уведіть ім'я, номер картки або телефону"
          className="card-num-input"
          autocomplete="on"
          inputMode="numeric"
        />
      </div>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        className="amount-input"
        inputMode="numeric"
      />
      <button type="submit" className="submit-btn">
        Надіслати
      </button>
    </form>
  );
};

export default CreateTransfer;
