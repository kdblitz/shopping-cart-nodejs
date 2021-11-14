const { expect } = require("chai");
const { CartItem } = require("../helper");

describe("CartItem model", () => {
  it("new() method creates correct structure", () => {
    const productCode = "productA";
    const quantity = 2;
    const productMap = {
      productA: {
        name: "Product A",
        price: 99.9,
      },
    };

    const cartItem = CartItem.new(productCode, quantity, productMap);

    const product = productMap[productCode];
    expect(cartItem).to.haveOwnProperty("item", product.name);
    expect(cartItem).to.haveOwnProperty("price", product.price);
    expect(cartItem).to.haveOwnProperty("quantity", quantity);
    expect(cartItem).to.haveOwnProperty("subtotal", product.price * quantity);
  });
});
