const { expect } = require("chai");
const { CartData, CartItem } = require("../helper");

describe("CartData model", () => {
  it("new() method creates correct structure", () => {
    const addedItems = {
      productA: 2,
    };
    const productMap = {
      productA: {
        name: "Product A",
        price: 99.9,
      },
    };
    const promoCode = "myPromoCode";

    const cartData = CartData.new(addedItems, productMap, promoCode);

    expect(cartData).to.haveOwnProperty("cartItems");
    expect(cartData.cartItems.productA).to.deep.equal(
      CartItem.new("productA", 2, productMap)
    );
    expect(cartData).to.haveOwnProperty("promoCode", promoCode);
  });
});
