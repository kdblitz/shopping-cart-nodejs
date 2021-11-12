const formatter = require('./utils/formatter');
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
    this.activePromos = activePromos;

    this.productMap = products.reduce((map, product) => {
      map[product.code] = product;
      return map;
    }, {});

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

  _prepareCartData() {
    const cartItems = Object.entries(this.addedItems).reduce(
      (cartData, [productCode, quantity]) => {
        const { name, price } = this.productMap[productCode];
        cartData[productCode] = {
          item: name,
          price,
          quantity,
          subtotal: price * quantity,
        };
        return cartData;
      },
      {}
    );

    return {
      cartItems,
      promoCode: this.promoCode,
    };
  }

  applyPromosToItems() {
    let cartData = this._prepareCartData();
    this.activePromos.forEach((applyPromo) => {
      cartData = applyPromo(cartData);
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
};

module.exports = ShoppingCart;