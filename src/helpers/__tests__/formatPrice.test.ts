import formatPrice from "../formatPrice";

describe("formatPrice", () => {
  it("Formats the price correctly for USD", () => {
    const priceData = { currency: "USD", amount: 1000, decimals: 2 };
    const formattedPrice = formatPrice(priceData);
    expect(formattedPrice).toBe("$1,000.00");
  });

  it("Formats the price correctly for EUR", () => {
    const priceData = { currency: "EUR", amount: 1000, decimals: 2 };
    const formattedPrice = formatPrice(priceData);
    expect(formattedPrice.replace(/\s/g, " ")).toBe("1 000,00 €");
  });

  it("Handles different decimal", () => {
    const priceData = { currency: "USD", amount: 1234.56, decimals: 1 };
    const formattedPrice = formatPrice(priceData);
    expect(formattedPrice).toBe("$1,234.6");
  });
});
