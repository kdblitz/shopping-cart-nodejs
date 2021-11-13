// Loader function to simplify loading of modules for tests
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

let formatter = null;
let promos = null;
let ShoppingCart = null;

try {
  formatter = require("../../utils/formatter");
} catch (err) {
  console.error("formatter not loaded", err);
}

try {
  promos = require("../../promos");
} catch (err) {
  console.error("promos not loaded", err);
}

try {
  ShoppingCart = require("../../ShoppingCart");
} catch (err) {
  console.error("ShoppingCart not loaded", err);
}

module.exports.formatter = formatter;
module.exports.promos = promos;
module.exports.ShoppingCart = ShoppingCart;

const loadPricingRule = () => {
  const pricingRulePath = "./test/helper/pricingRules.json";
  const data = fs.readFileSync(pricingRulePath);
  return JSON.parse(data);
};
const pricingRule = loadPricingRule();
module.exports.pricingRule = pricingRule;

const prepareProductMap = () => {
  const { products } = pricingRule;
  return ShoppingCart._convertToProductMap(products);
};
const productMap = prepareProductMap();
module.exports.productMap = productMap;

module.exports.prepareCartData = (addedItems, promoCode) => {};