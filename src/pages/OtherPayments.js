import React from "react";
import { NavLink } from "react-router-dom";
import BackButton from "../components/BackButton";

const OtherPayments = () => {
  return (
    <div className="other-payments">
      <BackButton to="/" color="white"/>
      <div className="header">Інші платежі</div>
      <div className="payments-container">
        <div className="container-header">Категорії</div>
        <NavLink className="payment-method" to="/">
          <div className="icon" />
          Поповнення мобільного
        </NavLink>
        <NavLink className="payment-method" to="/iban-payment">
          <div className="icon" />
          Платіж за IBAN
        </NavLink>
        <NavLink className="payment-method" to="/">
          <div className="icon" />
          Комунальний платіж
        </NavLink>
        <NavLink className="payment-method" to="/">
          <div className="icon" />
          Штрафи за порушення ПДР
        </NavLink>
        <NavLink className="payment-method" to="/">
          <div className="icon" />
          Комунальний платіж
        </NavLink>
      </div>
    </div>
  );
};

export default OtherPayments;
