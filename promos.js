/* cartData schema:
{
  cartItems:{
    [productCodeA]: {
      item: string
      price: number
      quantity: number
      subtotal: number
    }
    [productCodeB]: {
      item: string
      price: number
      quantity: number
      subtotal: number
    }
    ...
  }
  promoCode: string
}
*/

const clone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const ult_small_3for2_promo = (cart) => cart;
const ult_medium_1gb_free_promo = (cart, productMap) => cart;

const ult_large_bulk_promo = (cartData) => {
  if (
    cartData.cartItems.ult_large &&
    cartData.cartItems.ult_large.quantity > 3
  ) {
    cartData = clone(cartData);

    const { quantity, ...data } = cartData.cartItems.ult_large;
    const bulkPrice = 39.9;

    cartData.cartItems.ult_large = {
      ...data,
      quantity,
      price: bulkPrice,
      subtotal: bulkPrice * quantity,
    };
  }
  return cartData;
};

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

const noPromos = [(cartData, productMap) => cartData];

const activePromos = [
  ult_small_3for2_promo,
  ult_medium_1gb_free_promo,
  ult_large_bulk_promo,
  discount_code_promo,
];

module.exports = {
  ult_small_3for2_promo,
  ult_medium_1gb_free_promo,
  ult_large_bulk_promo,
  discount_code_promo,
  noPromos,
  activePromos,
};
