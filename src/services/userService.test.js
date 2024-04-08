import { renderHook } from "@testing-library/react-hooks";
import { useUserService } from "./userService";

describe("useUserService", () => {
  it("should fetch user data", async () => {
    const { result } = renderHook(() => useUserService());

    const userData = await result.current.getUserData();

    expect(userData).toBeDefined();
    // Перевірка на те, що дані користувача не є пустими або нульовими
    expect(userData).not.toBeNull();
  });

  it("should fetch user cards", async () => {
    const { result } = renderHook(() => useUserService());
    const userId = "user_id"; // Замініть на реальний ідентифікатор користувача

    const userCards = await result.current.getUserCards(userId);

    expect(userCards).toBeDefined();
    // Перевірка на те, що отримані карти не є пустими або нульовими
    expect(userCards.length).toBeGreaterThan(0);
  });

  it("should fetch user transfers", async () => {
    const { result } = renderHook(() => useUserService());
    const userId = "user_id"; // Замініть на реальний ідентифікатор користувача

    const userTransfers = await result.current.getUserTransfers(userId);

    expect(userTransfers).toBeDefined();
    // Перевірка на те, що отримані перекази не є пустими або нульовими
    expect(userTransfers.length).toBeGreaterThan(0);
  });
});
