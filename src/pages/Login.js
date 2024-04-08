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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
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
