const chai = require("chai");
const { expect } = chai;

const { toCurrencyFormat } = require("../utils/formatter");
const ShoppingCart = require("../ShoppingCart");

let toTestCart = null;

describe("Shopping Cart", () => {
  beforeEach(async () => {
    toTestCart = new ShoppingCart();
  });

  it("should use default formatter", () => {
    expect(toTestCart).to.have.property("toCurrencyFormat", toCurrencyFormat);
  });

  it("should have empty items initially", () => {
    expect(toTestCart.total).to.equal("$0.00");
    expect(toTestCart.items).to.be.empty;
  });
});
