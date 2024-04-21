import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Support = () => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const newText = e.target.value;
    setFormData({ ...formData, text: newText });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/more" />;
  }

  return (
    <form className="support" onSubmit={handleSubmit}>
      <div className="header">
        <NavLink className="back-btn" to="/more">
          -
        </NavLink>
        Підтримка
        <div className="small-text">Ми на зв'язку 24/7</div>
      </div>
      <label>Опишіть вашу проблему</label>
      <textarea
        value={formData.text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="text-area"
        maxLength={400}
      ></textarea>
      <button type="submit" className="submit-btn">
        Надіслати
      </button>
    </form>
  );
};

export default Support;
