const fs = require('fs');
const ShoppingCart = require('./ShoppingCart');

const rawFile = fs.readFileSync('./data/pricingRules.json');
const pricingRules = JSON.parse(rawFile);

const cart = new ShoppingCart(pricingRules);

cart.add("invalid");
cart.add("ult_small");

console.log(cart.total);
console.log(cart.items);
