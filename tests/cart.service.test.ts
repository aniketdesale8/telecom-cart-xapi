it("should recreate cart after expiry and retry addItem", () => {
  const sessionId = "expiry-test";

  const first = cartService.addItem(sessionId, {
    id: "1",
    name: "Phone",
    price: 100,
    quantity: 1
  });

  const second = cartService.addItem(sessionId, {
    id: "2",
    name: "SIM",
    price: 10,
    quantity: 2
  });

  expect(second.items.length).toBeGreaterThan(0);
  expect(second.total).toBeGreaterThan(0);
});