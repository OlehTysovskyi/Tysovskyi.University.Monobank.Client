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

  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const validateForm = (data) => {
    const emailValid = data.email.includes("@") && data.email.includes(".");
    const passwordValid = data.password.length >= 8;
    setFormValid(emailValid && passwordValid);
  };

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    validateForm(newFormData)
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
        <div className="input-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введіть е-пошту"
            className="login-input"
          />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введіть пароль"
            className="login-input"
          />
          <span className="show-pass-span">
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            Показати
          </span>
        </div>
        <button type="submit" className="login-button" disabled={!formValid}>
          Увійти
        </button>
        <GoogleAuthButton />
      </form>
      <p>
        Немаєте аккаунту?{" "}
        <NavLink to="/registration">Зареєструйтеся тут</NavLink>
      </p>
    </div>
  );
};

export default Login;
