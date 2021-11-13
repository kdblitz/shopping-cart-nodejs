const chai = require("chai");
const { expect } = chai;

const { promos, prepareCartData, productMap } = require("./helper");

let toTestPromo = null;

describe("Unlimited 1GB 3 for 2 code promo", () => {
  before(() => {
    toTestPromo = promos.ult_small_3for2_promo;
  });

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

describe("Unlimited 2GB with 1gb data pack bundle promo", () => {
  before(() => {
    toTestPromo = promos.ult_medium_1gb_bundle_promo;
  });

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

describe("Unlimited 5GB bulk order promo", () => {
  before(() => {
    toTestPromo = promos.ult_large_bulk_promo;
  });

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

describe("I<3AMAYSIM Discount code promo", () => {
  const promoCode = "I<3AMAYSIM";
  before(() => {
    toTestPromo = promos.discount_code_promo;
  });

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
