import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../contexts/authContext";
import { useCardService } from "../services/cardService";

const IBANPayment = () => {
  const { currentCard } = useAuth();
  const { updateBalance } = useCardService();

  const [formData, setFormData] = useState({
    sender_card_num: JSON.parse(currentCard).number,
    amount: 0,
  });

  const [redirect, setRedirect] = useState(false);
  const [isValidIBAN, setIsValidIBAN] = useState(false);
  const [isAmountEntered, setIsAmountEntered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "amount") {
      setIsAmountEntered(value.trim().length > 0);
    } else if (name === "iban") {
      setIsValidIBAN(validateIBAN(value));
    }
  };

  const handleCreatingTransfer = async (e) => {
    e.preventDefault();

    if (formData.iban === "") {
      alert("Уведіть номер IBAN");
      return;
    }

    if (!isValidIBAN) {
      alert("Неправильний формат IBAN");
      return;
    }

    if (formData.amount <= 0) {
      alert("Сума переказу повинна бути більша 0");
      return;
    }

    try {
      const shouldRedirect = updateBalance(formData);
      setRedirect(shouldRedirect);
    } catch (error) {
      alert(error.message);
    }
  };

  const validateIBAN = (iban) => {
    const ibanPattern = /^[A-Z]{2}\d{2}[A-Z\d]{4}\d{7}([A-Z\d]?){0,16}$/;
    return ibanPattern.test(iban);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleCreatingTransfer} className="iban-payment">
      <div className="header">
        <BackButton to="/other-payments" color="white"/>
        <div className="text">Платіж за IBAN</div>
        <input
          type="text"
          name="iban"
          value={formData.iban || ""}
          onChange={handleChange}
          placeholder="Уведіть IBAN"
          className="iban-input"
          autoComplete="on"
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
      <button
        type="submit"
        className="submit-btn"
        disabled={!isValidIBAN || !isAmountEntered}
      >
        Надіслати
      </button>
    </form>
  );
};

export default IBANPayment;
