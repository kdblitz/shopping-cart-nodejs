const chai = require("chai");
const fs = require("fs");
const { promisify } = require("util");
const { expect } = chai;

const readFile = promisify(fs.readFile);

const { toCurrencyFormat } = require("../utils/formatter");
const ShoppingCart = require("../ShoppingCart");

const pricingRulePath = "./data/pricingRules.json";

let toTestCart = null;

describe("Shopping Cart without pricing rule", () => {
  beforeEach(async () => {
    toTestCart = new ShoppingCart();
  });

  it("should use default formatter", () => {
    expect(toTestCart).to.have.property("toCurrencyFormat", toCurrencyFormat);
  });

  it("should have empty items initially", () => {
    expect(toTestCart.total).to.equal(toCurrencyFormat(0));
    expect(toTestCart.items).to.be.empty;
  });
});

describe("Shopping Cart with pricing rule but without any promos", () => {
  beforeEach(async () => {
    const data = await readFile(pricingRulePath);
    const pricingRule = JSON.parse(data);
    toTestCart = new ShoppingCart(pricingRule);
  });

  it("should have updated total and items property after single item to cart", () => {
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
