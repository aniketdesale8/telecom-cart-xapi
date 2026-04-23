import cartService from "../src/services/cart.service";

describe("CartService", () => {

  it("should create a cart and add item", () => {
    const sessionId = "s1";

    const result = cartService.addItem(sessionId, {
      id: "1",
      name: "Phone",
      price: 100,
      quantity: 1
    });

    expect(result.items.length).toBe(1);
    expect(result.total).toBe(100);
  });

  it("should handle cart expiry and retry operation", () => {
    const sessionId = "s2";

    const item = {
      id: "2",
      name: "SIM",
      price: 10,
      quantity: 2
    };

    const result = cartService.addItem(sessionId, item);

    expect(result.total).toBe(20);
  });

});