const formatter = require('./utils/formatter');

const ShoppingCart = class {
  productMap = {};
  addedItems = {};
  promoCode = null;
  toCurrencyFormat = (val) => val;

  constructor({
    products = [],
    toCurrencyFormat = formatter.toCurrencyFormat,
  } = {}) {
    this.toCurrencyFormat = toCurrencyFormat;

    this.productMap = products.reduce((map, product) => {
      map[product.code] = product;
      return map;
    }, {});

    this.addedItems = {};
  }

  add(itemCode, promoCode = "") {
    if (this.productMap[itemCode]) {
      this.addedItems[itemCode] = this.addedItems[itemCode]
        ? ++this.addedItems[itemCode]
        : 1;
    } else {
      console.error(`${itemCode} not found`);
    }
  }

  get total() {
    const total = Object.entries(this.addedItems).reduce(
      (totalAmount, [productCode, quantity]) => {
        totalAmount += this.productMap[productCode].price * quantity;
        return totalAmount;
      },
      0
    );
    return this.toCurrencyFormat(total);
  }

  get items() {
    return Object.entries(this.addedItems).map(([productCode, quantity]) => ({
      item: this.productMap[productCode].name,
      quantity,
    }));
  }
};

module.exports = ShoppingCart;