import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useAuthentication } from "../services/authService";

const Login = () => {
  const { login } = useAuthentication();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const shouldRedirect = await login(formData);
      setRedirect(shouldRedirect);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="login-input"
        />
        <button
          type="submit"
          className="login-button"
        >
          Login
        </button>
        <GoogleAuthButton />
      </form>
      <p>
        Don't have an account?{" "}
        <NavLink to="/registration">Register here</NavLink>
      </p>
    </div>
  );
};

export default Login;
