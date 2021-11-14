const { expect } = require("chai");
const { promos, prepareCartData } = require("../../helper");
const toTestPromo = promos.discount_code_promo;

describe("I<3AMAYSIM Discount code promo", () => {
  const promoCode = "I<3AMAYSIM";

  it("should grant 10% discount on single product purchase", () => {
    let cartData = prepareCartData({ ult_small: 1 }, promoCode);
    let tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 22.41,
          quantity: 1,
          subtotal: 22.41,
        },
      },
      promoCode,
    });
  });

  it("should grant 10% discount on multiple purchase of single product", () => {
    let cartData = prepareCartData({ ult_small: 4 }, promoCode);
    let tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 22.41,
          quantity: 4,
          subtotal: 89.64,
        },
      },
      promoCode,
    });
  });

  it("should grant 10% discount on multiple purchase of multiple products", () => {
    let cartData = prepareCartData({ ult_small: 1, ult_large: 1 }, promoCode);
    let tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_small: {
          item: "Unlimited 1GB",
          price: 22.41,
          quantity: 1,
          subtotal: 22.41,
        },
        ult_large: {
          item: "Unlimited 5GB",
          price: 40.41,
          quantity: 1,
          subtotal: 40.41,
        },
      },
      promoCode,
    });
  });
});

describe("Invalid Discount code", () => {
  const promoCode = "Invalid";

  it("should grant no discount on any product purchase", () => {
    let cartData = prepareCartData({ ult_small: 1 }, promoCode);
    let tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal({
      ...cartData,
      promoCode,
    });
  });
});
