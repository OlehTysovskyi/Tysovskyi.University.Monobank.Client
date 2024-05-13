// Support.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage";
import { useSupportService } from "../services/supportService";

const Support = () => {
  const { sendSupportEmail } = useSupportService();
  const [formData, setFormData] = useState({
    problem_text: "",
  });

  const maxLength = 400;
  const [successMessage, setSuccessMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handleChange = (e) => {
    const newText = e.target.value;
    setFormData({ ...formData, problem_text: newText });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const showSuccessMessage = await sendSupportEmail(formData);
      if (showSuccessMessage) {
        setSuccessMessage("Вашу проблему успішно надіслано!");
        setSuccessVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form className="support" onSubmit={handleSubmit}>
        <div className="header">
          <NavLink className="back-btn" to="/more">
            -
          </NavLink>
          Підтримка
          <div className="small-text">Ми на зв'язку 24/7</div>
        </div>
        <div className="hint">Зв'язок з нами через електронну пошту</div>
        <label>Напишіть ваше повідомлення</label>
        <textarea
          value={formData.problem_text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="text-area"
          maxLength={maxLength}
        ></textarea>
        <div className="character-count">
          {formData.problem_text.length}/{maxLength} (мін 50 символів)
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={formData.problem_text.length < 50}
        >
          Надіслати
        </button>
        <SuccessMessage message={successMessage} visible={successVisible} />
      </form>
    </>
  );
};

export default Support;
