import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAuthentication } from "../services/authService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Registration = () => {
  const { register } = useAuthentication();
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Ім'я має містити лише англійські літери")
      .min(2, "Ім'я занадто коротке! Мінімум 2 символи.")
      .max(20, "Ім'я занадто довге! Максимум 20 символів.")
      .required("Обов'язкове поле"),
    email: Yup.string()
      .email("Некоректний email")
      .test(
        "is-valid-domain",
        "Неправильний домен електронної адреси",
        function (value) {
          const validDomains = [
            "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
          ];
          return validDomains.includes(value.split("@")[1]);
        }
      )
      .required("Обов'язкове поле"),
    password: Yup.string()
      .min(8, "Пароль занадто короткий! Мінімум 8 символів.")
      .max(128, "Пароль занадто довгий! Максимум 128 символів.")
      .required("Обов'язкове поле"),
  });

  const handleRegistration = async (values) => {
    try {
      const shouldRedirect = await register(values);
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
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={handleRegistration}
      >
        {({ isValid, setFieldValue }) => (
          <Form className="registration-form">
            <div className="input-box">
              <Field
                type="text"
                name="username"
                placeholder="Введіть ім'я"
                className="registration-input"
                onChange={(e) => {
                  setFieldValue(
                    "username",
                    e.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇёЁєЄ]/gu, "")
                  );
                }}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-box">
              <Field
                type="email"
                name="email"
                placeholder="Введіть е-пошту"
                className="registration-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="input-box">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Введіть пароль"
                className="registration-input"
              />
              <span className="show-pass-span">
                <input
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                />
                Показати
              </span>
              <ErrorMessage
                name="password"
                component="div"
                className="error-msg"
              />
            </div>
            <button
              type="submit"
              className="registration-button"
              disabled={!isValid}
            >
              Зареєструватися
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Вже маєте аккаунт? <NavLink to="/login">Увійдіть тут</NavLink>
      </p>
    </div>
  );
};

export default Registration;
