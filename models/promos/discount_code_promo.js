const clone = require("../../utils/clone");

const discount_code_promo = (cartData) => {
  if (!cartData.promoCode) {
    return cartData;
  }
  cartData = clone(cartData);

  let discount;
  switch (cartData.promoCode) {
    case "I<3AMAYSIM":
      discount = 10;
      break;
    default:
      discount = 0;
  }

  const toPay = 100 - discount;

  for (prop in cartData.cartItems) {
    const cartItem = cartData.cartItems[prop];
    cartData.cartItems[prop] = {
      ...cartItem,
      price: (cartItem.price * toPay) / 100,
      subtotal: (cartItem.subtotal * toPay) / 100,
    };
  }
  return cartData;
};

module.exports = discount_code_promo;
