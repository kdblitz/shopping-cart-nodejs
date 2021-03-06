const { expect } = require("chai");
const { promos, prepareCartData } = require("../../helper");
const toTestPromo = promos.ult_large_bulk_promo;

describe("Unlimited 5GB bulk order promo", () => {
  it("should grant discount with 4 or more ultimate 5GB purchases", () => {
    let cartData = prepareCartData({ ult_large: 4 });
    let tranformedCartData = toTestPromo(cartData);
    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_large: {
          item: "Unlimited 5GB",
          price: 39.9,
          quantity: 4,
          subtotal: 159.6,
        },
      },
      promoCode: null,
    });

    cartData = prepareCartData({ ult_large: 10 });
    tranformedCartData = toTestPromo(cartData);
    expect(tranformedCartData).to.be.deep.equal({
      cartItems: {
        ult_large: {
          item: "Unlimited 5GB",
          price: 39.9,
          quantity: 10,
          subtotal: 399,
        },
      },
      promoCode: null,
    });
  });

  it("should not grant discount with 3 or less items", () => {
    let cartData = prepareCartData({ ult_large: 1 });
    let tranformedCartData = toTestPromo(cartData);
    expect(tranformedCartData).to.be.deep.equal(cartData);

    cartData = prepareCartData({ ult_large: 3 });
    tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal(cartData);
  });

  it("should not grant discount for bulk non-unlimited 5GB items", () => {
    let cartData = prepareCartData({ ult_small: 4 });
    let tranformedCartData = toTestPromo(cartData);

    expect(tranformedCartData).to.be.deep.equal(cartData);
  });
});
