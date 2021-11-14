const { expect } = require("chai");
const { promos, prepareCartData } = require("../../helper");
const toTestPromo = promos.ult_small_3for2_promo;

describe("Unlimited 1GB 3 for 2 code promo", () => {
  it("should not grant discount for single Unlimited 1GB purchase", () => {
    let cartData = prepareCartData({ ult_small: 1 });
    let tranformedCartData = toTestPromo(cartData);
    expect(tranformedCartData).to.be.deep.equal(cartData);
  });

  it("should grant discount for 3 Unlimited 1GB purchase", () => {
    let cartData = prepareCartData({ ult_small: 3 });
    let tranformedCartData = toTestPromo(cartData);
    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 24.9,
          quantity: 3,
          subtotal: 49.8,
        },
      },
      promoCode: null,
    });
  });

  it("should partially grant discount for 5 Unlimited 1GB purchase", () => {
    let cartData = prepareCartData({ ult_small: 5 });
    let tranformedCartData = toTestPromo(cartData);
    const quantityToPay = 4; // 1 item will be discounted out of 5

    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 24.9,
          quantity: 5,
          subtotal: 24.9 * quantityToPay,
        },
      },
      promoCode: null,
    });
  });

  it("should grant 2 discounts for 6 Unlimited 1GB purchase", () => {
    let cartData = prepareCartData({ ult_small: 6 });
    let tranformedCartData = toTestPromo(cartData);
    const quantityToPay = 4; // 1 item will be discounted out of 5

    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 24.9,
          quantity: 6,
          subtotal: 24.9 * quantityToPay,
        },
      },
      promoCode: null,
    });
  });
});
