import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "../app/App";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Account from "../pages/Account";
import CreateCard from "../pages/CreateCard";
import CreateTransfer from "../pages/CreateTransfer";
import CardsAndAccounts from "../pages/CardsAndAccounts";
import OtherPayments from "../pages/OtherPayments";
import IBANPayment from "../pages/IBANPayment";
import Savings from "../pages/Savings"

import { useAuth } from "../contexts/authContext";

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
          />
          <Route path="/create-card-or-account" element={<CreateCard />} />
          <Route path="/create-transfer" element={<CreateTransfer />} />
          <Route path="/cards-and-accounts" element={<CardsAndAccounts />} />
          <Route path="/other-payments" element={<OtherPayments />} />
          <Route path="/iban-payment" element={<IBANPayment />} />
          <Route path="/savings" element={<Savings />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
