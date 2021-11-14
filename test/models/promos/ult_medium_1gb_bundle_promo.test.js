const { expect } = require("chai");
const { promos, prepareCartData, productMap } = require("../../helper");
const toTestPromo = promos.ult_medium_1gb_bundle_promo;

describe("Unlimited 2GB with 1gb data pack bundle promo", () => {
  it("should not grant bundle for non-unlimited 2GB product", () => {
    let cartData = prepareCartData({ ult_small: 1 });
    let tranformedCartData = toTestPromo(cartData, productMap);
    expect(tranformedCartData).to.be.deep.equal(cartData);
  });

  it("should grant bundle for every unlimited 2GB product", () => {
    let cartData = prepareCartData({ ult_medium: 2 });
    let tranformedCartData = toTestPromo(cartData, productMap);
    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        "1gb": {
          item: "1 GB Data-pack",
          price: 9.9,
          quantity: 2,
          subtotal: 0,
        },
        ult_medium: {
          item: "Unlimited 2GB",
          price: 29.9,
          quantity: 2,
          subtotal: 29.9 * 2,
        },
      },
      promoCode: null,
    });
  });

  it("should properly increment 1GB data pack when buying unlimited 2GB product", () => {
    let cartData = prepareCartData({ ult_medium: 1, "1gb": 1 });
    let tranformedCartData = toTestPromo(cartData, productMap);
    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        "1gb": {
          item: "1 GB Data-pack",
          price: 9.9,
          quantity: 2,
          subtotal: 9.9,
        },
        ult_medium: {
          item: "Unlimited 2GB",
          price: 29.9,
          quantity: 1,
          subtotal: 29.9,
        },
      },
      promoCode: null,
    });
  });
});
