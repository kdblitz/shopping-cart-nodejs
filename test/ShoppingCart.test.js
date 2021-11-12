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

describe("Shopping Cart with pricing rule", () => {
  beforeEach(async () => {
    const data = await readFile(pricingRulePath);
    const pricingRule = JSON.parse(data);
    toTestCart = new ShoppingCart(pricingRule);
  });

  it("should have updated total and items property after adding to cart", () => {
    toTestCart.add("ult_small");

    expect(toTestCart.total).to.equal(toCurrencyFormat(24.9));
    expect(toTestCart.items).to.deep.equal([
      {
        item: "Unlimited 1GB",
        quantity: 1,
      },
    ]);
  });
});
