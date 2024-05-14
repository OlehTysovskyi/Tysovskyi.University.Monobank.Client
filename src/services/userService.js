import { useAuth } from "../contexts/authContext";

export const useUserService = () => {
  const { currentUser } = useAuth();

  let userId;
  try {
    userId = JSON.parse(currentUser)?.id;
  } catch (error) {
    console.error("Error parsing currentUser:", error);
  }

  const getUserData = async () => {
    if (!userId) {
      console.error("User not found");
      return null;
    }
    try {
      const response = await fetch(
        `https://tysovskyi-university-monobank-server.vercel.app/api/get-user-by-id/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return userData.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const getUserCards = async () => {
    if (!userId) {
      console.error("User not found");
      return [];
    }
    try {
      const response = await fetch(
        `https://tysovskyi-university-monobank-server.vercel.app/api/get-user-cards/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user cards");
      }
      const data = await response.json();
      return data.cards;
    } catch (error) {
      console.error("Error fetching user cards:", error);
      return [];
    }
  };

  const getUserTransfers = async () => {
    if (!userId) {
      console.error("User not found");
      return [];
    }
    try {
      const response = await fetch(
        `https://tysovskyi-university-monobank-server.vercel.app/api/get-user-transfers/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user transfers");
      }
      const data = await response.json();
      return data.transfers;
    } catch (error) {
      console.error("Error fetching user transfers:", error);
      return [];
    }
  };

  const getUserBanks = async () => {
    if (!userId) {
      console.error("User not found");
      return [];
    }
    try {
      const response = await fetch(
        `https://tysovskyi-university-monobank-server.vercel.app/api/get-user-banks/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user banks");
      }
      const data = await response.json();
      return data.banks;
    } catch (error) {
      console.error("Error fetching user banks:", error);
      return [];
    }
  };

  return {
    getUserData,
    getUserCards,
    getUserTransfers,
    getUserBanks,
  };
};
