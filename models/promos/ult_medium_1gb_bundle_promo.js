const CartItem = require("../CartItem");
const clone = require("../../utils/clone");

const ult_medium_1gb_bundle_promo = (cartData, productMap) => {
  if (!cartData.cartItems.ult_medium) {
    return cartData;
  }

  cartData = clone(cartData);

  const freeQuantity = cartData.cartItems.ult_medium.quantity;
  const bundledProductCode = "1gb";

  if (!cartData.cartItems[bundledProductCode]) {
    cartData.cartItems[bundledProductCode] = CartItem.new(
      bundledProductCode,
      0,
      productMap
    );
  }
  cartData.cartItems[bundledProductCode].quantity += freeQuantity;

  return cartData;
};

module.exports = ult_medium_1gb_bundle_promo;
