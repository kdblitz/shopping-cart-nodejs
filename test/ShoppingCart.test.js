const chai = require("chai");
const { expect } = chai;
require("mocha-sinon");

const { ShoppingCart, formatter, pricingRule, promos } = require("./helper");
const { toCurrencyFormat } = formatter;
const { noPromos } = promos;

let toTestCart = null;

describe("Shopping Cart without pricing rule", () => {
  beforeEach(async () => {
    toTestCart = ShoppingCart.new();
  });

  it("should use default formatter", () => {
    expect(toTestCart).to.have.property("toCurrencyFormat", toCurrencyFormat);
  });

  it("should have empty items initially", () => {
    expect(toTestCart.total).to.equal(toCurrencyFormat(0));
    expect(toTestCart.items).to.be.empty;
  });
});

describe("Shopping Cart with pricing rule without any promos", function () {
  beforeEach(function () {
    this.sinon.stub(console, "error");

    toTestCart = ShoppingCart.new({
      ...pricingRule,
      promos: noPromos,
    });
  });

  it("should have unchanged total and items property after adding invalid item", () => {
    const invalidItem = "invalid_item";
    toTestCart.add(invalidItem);

    expect(console.error.calledWith(`${invalidItem} not found`)).to.be.true;

    expect(toTestCart.total).to.equal(toCurrencyFormat(0));
    expect(toTestCart.items).to.be.empty;
  });

  it("should have updated total and items property after adding single item", () => {
    toTestCart.add("ult_small");

    expect(toTestCart.total).to.equal(toCurrencyFormat(24.9));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 1,
      },
    ]);
  });

  it("should have updated total and items property after adding multiple quantity of single product", () => {
    toTestCart.add("ult_small");
    toTestCart.add("ult_small");

    expect(toTestCart.total).to.equal(toCurrencyFormat(24.9 * 2));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 2,
      },
    ]);
  });

  it("should have updated total and items property after adding single quantity of multiple product", () => {
    toTestCart.add("ult_small");
    toTestCart.add("ult_medium");

    expect(toTestCart.total).to.equal(toCurrencyFormat(24.9 + 29.9));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 1,
      },
      {
        item: "Unlimited 2GB",
        quantity: 1,
      },
    ]);
  });
});

describe("Shopping Cart with pricing rule with active promos", () => {
  beforeEach(function () {
    toTestCart = ShoppingCart.new(pricingRule);
  });

  it("buying 3 Unlimited 1 GB and 1 Unlimited 5 GB should trigger 3for1 promo (scenario 1)", () => {
    toTestCart.add("ult_small");
    toTestCart.add("ult_small");
    toTestCart.add("ult_small");
    toTestCart.add("ult_large");

    expect(toTestCart.total).to.equal(toCurrencyFormat(94.7));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 3,
      },
      {
        item: "Unlimited 5GB",
        quantity: 1,
      },
    ]);
  });

  it("buying 2 Unlimited 1 GB and 4 Unlimited 5 GB should trigger Unlimited 5 GB bulk discount (scenario 2)", () => {
    toTestCart.add("ult_small");
    toTestCart.add("ult_small");
    toTestCart.add("ult_large");
    toTestCart.add("ult_large");
    toTestCart.add("ult_large");
    toTestCart.add("ult_large");

    expect(toTestCart.total).to.equal(toCurrencyFormat(209.4));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 2,
      },
      {
        item: "Unlimited 5GB",
        quantity: 4,
      },
    ]);
  });

  it("buying 1 Unlimited 1 GB and 2 Unlimited 2 GB should trigger 1 GB data pack bundle (scenario 3)", () => {
    toTestCart.add("ult_small");
    toTestCart.add("ult_medium");
    toTestCart.add("ult_medium");

    expect(toTestCart.total).to.equal(toCurrencyFormat(84.7));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 1,
      },
      {
        item: "Unlimited 2GB",
        quantity: 2,
      },
      {
        item: "1 GB Data-pack",
        quantity: 2,
      },
    ]);
  });

  it("buying 1 Unlimited 1 GB, 1 GB data pack with valid promo code should grant cart-wide discount (scenario 4)", () => {
    toTestCart.add("ult_small");
    toTestCart.add("1gb", "I<3AMAYSIM");

    expect(toTestCart.total).to.equal(toCurrencyFormat(31.32));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 1,
      },
      {
        item: "1 GB Data-pack",
        quantity: 1,
      },
    ]);
  });
});