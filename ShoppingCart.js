const formatter = require('./utils/formatter');
const cartDataFactory = require("./utils/cartDataFactory");
const { activePromos } = require("./promos");

class ShoppingCart {
  productMap = {};
  addedItems = {};
  promoCode = null;
  toCurrencyFormat = (val) => val;
  activePromos = [(cartData, productMap) => cartData];

  constructor({
    products = [],
    toCurrencyFormat = formatter.toCurrencyFormat,
    promos = activePromos,
  } = {}) {
    this.toCurrencyFormat = toCurrencyFormat;
    this.activePromos = promos;
    this.productMap = _convertToProductMap(products);
    this.addedItems = {};
  }

  clear() {
    this.addedItems = {};
  }

  add(itemCode, promoCode = null) {
    if (this.productMap[itemCode]) {
      this.addedItems[itemCode] = this.addedItems[itemCode]
        ? ++this.addedItems[itemCode]
        : 1;
    } else {
      console.error(`${itemCode} not found`);
    }
    this.promoCode = promoCode ? promoCode : this.promoCode;
  }

  applyPromosToItems() {
    let cartData = _prepareCartData(
      this.addedItems,
      this.productMap,
      this.promoCode
    );
    this.activePromos.forEach((applyPromo) => {
      cartData = applyPromo(cartData, this.productMap);
    });

    return cartData;
  }

  get total() {
    const cartData = this.applyPromosToItems();

    const total = Object.values(cartData.cartItems)
      .map((cartItem) => cartItem.subtotal)
      .reduce((sum, subtotal) => sum + subtotal, 0);

    return this.toCurrencyFormat(total);
  }

  get items() {
    const cartData = this.applyPromosToItems();

    return Object.values(cartData.cartItems).map(({ item, quantity }) => ({
      item,
      quantity,
    }));
  }
}

const _convertToProductMap = (products) => {
  return products.reduce((map, product) => {
    map[product.code] = product;
    return map;
  }, {});
};

const _prepareCartData = (addedItems, productMap, promoCode) => {
  const cartItems = Object.entries(addedItems).reduce(
    (cartData, [productCode, quantity]) => {
      cartData[productCode] = cartDataFactory(
        productCode,
        quantity,
        productMap
      );
      return cartData;
    },
    {}
  );

  return {
    cartItems,
    promoCode,
  };
};

module.exports = ShoppingCart;
module.exports.new = (pricingRules) => new ShoppingCart(pricingRules);
// additional exports mainly to be used on tests
module.exports._convertToProductMap = _convertToProductMap;
module.exports._prepareCartData = _prepareCartData;