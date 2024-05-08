export const createTransfer = async (formData) => {
  try {
    const response = await fetch("https://tysovskyi-university-monobank-server.vercel.app/api/create-transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Transfer created successfully");
      return true;
    } else if (response.status === 400) {
      alert(data.message);
      return false;
    } else {
      console.error("Transfer creating failed");
      return false;
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
