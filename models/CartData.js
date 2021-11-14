const CartItem = require("./CartItem");

class CartData {
  cartItems; // CartItem[]
  promoCode; // string

  constructor(addedItems, productMap, promoCode) {
    const cartItems = Object.entries(addedItems).reduce(
      (items, [productCode, quantity]) => {
        items[productCode] = CartItem.new(productCode, quantity, productMap);
        return items;
      },
      {}
    );

    this.cartItems = cartItems;
    this.promoCode = promoCode;
  }
}

module.exports = CartData;
module.exports.new = (addedItems, productMap, promoCode) =>
  new CartData(addedItems, productMap, promoCode);
