import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAuthentication } from "../services/authService";

const Registration = () => {
  const { register } = useAuthentication();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const shouldRedirect = await register(formData);
      setRedirect(shouldRedirect);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="registration-container">
      <form onSubmit={handleRegistration} className="registration-form">
        <input
          type="text"
          name="username"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your username"
          className="registration-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="registration-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="registration-input"
        />
        <button type="submit" className="registration-button">
          Register
        </button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login here</NavLink>
      </p>
    </div>
  );
};

export default Registration;
