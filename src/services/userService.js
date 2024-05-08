import { useAuth } from "../contexts/authContext";

export const useUserService = () => {
  const { currentUser } = useAuth();

  const getUserData = async () => {
    try {
      const userId = JSON.parse(currentUser).id;
      if (!userId) {
        return null;
      }

      const response = await fetch(`https://tysovskyi-university-monobank-server.vercel.app/api/get-user-by-id/${userId}`);
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

  const getUserCards = async (userId) => {
    try {
      const response = await fetch(`https://tysovskyi-university-monobank-server.vercel.app/api/get-user-cards/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user cards");
      }
      const data = await response.json();
      return data.cards;
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  const getUserTransfers = async (userId) => {
    try {
      const response = await fetch(`https://tysovskyi-university-monobank-server.vercel.app/api/get-user-transfers/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user cards");
      }
      const data = await response.json();
      return data.transfers;
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  return {
    getUserData,
    getUserCards,
    getUserTransfers,
  };
};
