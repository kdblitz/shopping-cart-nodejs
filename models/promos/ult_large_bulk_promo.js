const clone = require("../../utils/clone");

const ult_large_bulk_promo = (cartData) => {
  if (
    !cartData.cartItems.ult_large ||
    cartData.cartItems.ult_large.quantity <= 3
  ) {
    return cartData;
  }

  cartData = clone(cartData);

  const { quantity, ...data } = cartData.cartItems.ult_large;
  const bulkPrice = 39.9;

  cartData.cartItems.ult_large = {
    ...data,
    quantity,
    price: bulkPrice,
    subtotal: bulkPrice * quantity,
  };
  return cartData;
};

module.exports = ult_large_bulk_promo;
