import { useAuth } from "../contexts/authContext";

export const useAuthentication = () => {
  const { setIsLoggedIn, currentUser, setCurrentUser, setCurrentCard } =
    useAuth();

  const login = async (formData) => {
    try {
      const response = await fetch("https://tysovskyi-university-monobank-server.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        setIsLoggedIn(true);
        setCurrentUser(JSON.stringify(data.user));
        setCurrentCard(JSON.stringify(data.currentCard));
        return true;
      } else if (response.status === 401) {
        console.error(data.message);
        alert(data.message);
        return false;
      } else {
        console.error("Login failed");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch("https://tysovskyi-university-monobank-server.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        setIsLoggedIn(true);
        setCurrentUser(JSON.stringify(data.user));
        return true;
      } else if (response.status === 400) {
        console.error("Registration failed:", data.message);
        alert(data.message);
        return false;
      } else if (response.status === 409) {
        console.error("Registration failed:", data.message);
        alert(data.message);
        return false;
      } else {
        console.error("Registration failed");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const handleGoogleAuth = async () => {
    try {
      window.open("https://tysovskyi-university-monobank-server.vercel.app/auth/google", "_self");
      console.log("Login successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://tysovskyi-university-monobank-server.vercel.app/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setCurrentUser(JSON.stringify(data.user));
      setCurrentCard(JSON.stringify(data.currentCard));
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (!currentUser) {
        await handleGoogleAuth();
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { login, register, handleGoogleLogin, fetchUserProfile };
};
