// Loader function to simplify loading of modules for tests

let formatter = null;
let ShoppingCart = null;

try {
  formatter = require("../../utils/formatter");
} catch (err) {
  console.error("formatter not loaded", err);
}

try {
  ShoppingCart = require("../../ShoppingCart");
} catch (err) {
  console.error("ShoppingCart not loaded", err);
}

module.exports = {
  formatter,
  ShoppingCart,
};
