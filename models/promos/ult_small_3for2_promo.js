const clone = require("../../utils/clone");

const ult_small_3for2_promo = (cartData) => {
  if (!cartData.cartItems.ult_small) {
    return cartData;
  }
  cartData = clone(cartData);

  const quantityToPay = 2;
  const discountThreshold = 3;
  const { quantity, price, ...data } = cartData.cartItems.ult_small;
  const discountedItems = Math.floor(quantity / discountThreshold);
  const regularItems = quantity % discountThreshold;

  const discountedAmount = discountedItems * quantityToPay * price;
  const regularAmount = regularItems * price;
  cartData.cartItems.ult_small = {
    quantity,
    price,
    ...data,
    subtotal: discountedAmount + regularAmount,
  };

  return cartData;
};

module.exports = ult_small_3for2_promo;
