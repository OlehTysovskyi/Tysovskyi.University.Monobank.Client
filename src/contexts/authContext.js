import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn ? JSON.parse(loggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing currentUser:", error);
      return null;
    }
  });

  const setCurrentUser = (user) => {
    try {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUserState(user);
    } catch (error) {
      console.error("Error setting currentUser:", error);
    }
  };

  const [currentCard, setCurrentCardState] = useState(() => {
    try {
      const card = localStorage.getItem("currentCard");
      return card ? JSON.parse(card) : null;
    } catch (error) {
      console.error("Error parsing currentCard:", error);
      return null;
    }
  });

  const setCurrentCard = (card) => {
    try {
      localStorage.setItem("currentCard", JSON.stringify(card));
      setCurrentCardState(card);
    } catch (error) {
      console.error("Error setting currentCard:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        currentCard,
        setCurrentCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
