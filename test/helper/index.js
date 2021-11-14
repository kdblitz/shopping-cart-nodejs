// Loader function to simplify loading of modules for tests
const fs = require("fs");

const moduleLoader = (path) => {
  try {
    return require(path);
  } catch (err) {
    const splitPath = path.split("/");
    console.error(`'${splitPath[splitPath.length - 1]}' not loaded `, err);
    return null;
  }
};

let formatter = moduleLoader("../../utils/formatter");
let promos = moduleLoader("../../models/promos");
let CartItem = moduleLoader("../../models/CartItem");
let CartData = moduleLoader("../../models/CartData");
let ShoppingCart = moduleLoader("../../models/ShoppingCart");

module.exports.formatter = formatter;
module.exports.promos = promos;
module.exports.CartItem = CartItem;
module.exports.CartData = CartData;
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

module.exports.prepareCartData = (addedItems, promoCode = null) => {
  return CartData.new(addedItems, productMap, promoCode);
};