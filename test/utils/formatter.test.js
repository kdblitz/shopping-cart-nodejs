const chai = require("chai");
const { expect } = chai;

const { formatter } = require("../helper");

const { toCurrencyFormat } = formatter;

describe("toCurrencyFormat() function", () => {
  it("should properly format positive values", () => {
    expect(toCurrencyFormat(0)).to.equal("$0.00");
    expect(toCurrencyFormat(1)).to.equal("$1.00");
    expect(toCurrencyFormat(0.5)).to.equal("$0.50");
    expect(toCurrencyFormat(10.99)).to.equal("$10.99");
  });
  it("should properly format negative values", () => {
    expect(toCurrencyFormat(-1)).to.equal("-$1.00");
    expect(toCurrencyFormat(-0.5)).to.equal("-$0.50");
    expect(toCurrencyFormat(-10.99)).to.equal("-$10.99");
  });

  it("should properly format numeric strings", () => {
    expect(toCurrencyFormat("1")).to.equal("$1.00");
    expect(toCurrencyFormat("-0.5")).to.equal("-$0.50");
    expect(toCurrencyFormat("10.99")).to.equal("$10.99");
  });

  it("should return NaN for non-numeric values", () => {
    expect(toCurrencyFormat("zero")).to.be.NaN;
  });
});
