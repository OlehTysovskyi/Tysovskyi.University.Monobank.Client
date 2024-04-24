import { useAuth } from "../contexts/authContext";

export const useSupportService = () => {
  const { currentUser } = useAuth();

  const sendSupportEmail = async (formData) => {
    try {
      if (!currentUser) {
        console.error("Current user is not available");
        return false;
      }

      formData.sender_email = JSON.parse(currentUser).email;

      const response = await fetch("/api/send-support-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // const data = await response.json();
      if (response.ok) {
        // console.log(data.message);
        return true;
      } else if (response.status === 400) {
        // console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return {
    sendSupportEmail,
  };
};
