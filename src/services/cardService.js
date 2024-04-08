import { useAuth } from "../contexts/authContext";

export const useCardService = () => {
  const { setCurrentCard } = useAuth();

  const createCard = async (formData) => {
    try {
      const response = await fetch("/api/create-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Card created successfully");
        return data;
      } else if (response.status === 400) {
        throw new Error(data.message);
      } else {
        throw new Error("Card creating failed");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getCardData = async () => {
    try {
      const cardId = localStorage.getItem("cardId");
      if (!cardId) {
        return null;
      }

      const response = await fetch(`/api/get-card-by-id/${cardId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch card data");
      }

      const cardData = await response.json();
      return cardData.card;
    } catch (error) {
      console.error("Error fetching card data:", error);
      return null;
    }
  };

  const getUserCards = async (userId) => {
    try {
      const response = await fetch(`/api/get-user-cards/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user cards");
      }
      const data = await response.json();
      return data.cards;
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  const getUsernameByCardNum = async (cardNum) => {
    try {
      if (!cardNum) {
        return null;
      }

      const response = await fetch(`/api/get-username-by-card-num/${cardNum}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data.username;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const updateBalance = async (formData) => {
    try {
      const response = await fetch("/api/update-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentCard(JSON.stringify(data.card));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    createCard,
    getCardData,
    getUserCards,
    getUsernameByCardNum,
    updateBalance,
  };
};
