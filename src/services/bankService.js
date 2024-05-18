export const useBankService = () => {
  const createBank = async (formData) => {
    try {
      const response = await fetch(
        "https://tysovskyi-university-monobank-server.vercel.app/api/create-bank",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.message);
        } else {
          throw new Error("Bank creating failed");
        }
      }

      console.log("Bank created successfully");
      return data;
    } catch (error) {
      console.error("Error creating bank:", error.message);
      throw new Error(error.message);
    }
  };

  const getBankData = async (bankId) => {
    try {
      if (!bankId) {
        return null;
      }

      const response = await fetch(
        `https://tysovskyi-university-monobank-server.vercel.app/api/get-bank-by-id/${bankId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bank data");
      }

      const bankData = await response.json();
      return bankData;
    } catch (error) {
      console.error("Error fetching bank data:", error);
      return null;
    }
  };

  return {
    createBank,
    getBankData,
  };
};
