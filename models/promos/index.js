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

const ult_small_3for2_promo = require("./ult_small_3for2_promo");
const ult_medium_1gb_bundle_promo = require("./ult_medium_1gb_bundle_promo");
const ult_large_bulk_promo = require("./ult_large_bulk_promo");
const discount_code_promo = require("./discount_code_promo");

const noPromos = [(cartData, productMap) => cartData];

const activePromos = [
  ult_small_3for2_promo,
  ult_medium_1gb_bundle_promo,
  ult_large_bulk_promo,
  discount_code_promo,
];

module.exports = {
  ult_small_3for2_promo,
  ult_medium_1gb_bundle_promo,
  ult_large_bulk_promo,
  discount_code_promo,
  noPromos,
  activePromos,
};
