const formatter = require('./utils/formatter');

const ShoppingCart = class {
  constructor({products, toCurrencyFormat = formatter.toCurrencyFormat}) {
    this.toCurrencyFormat = toCurrencyFormat;

    this.productMap = products.reduce((map, product) => {
      map[product.code] = product;
      return map;
    },{});

    this.addedItems = {};
  }

  add(itemCode, promoCode = '') {
    if (this.productMap[itemCode]) {
      this.addedItems[itemCode] = this.addedItems[itemCode] || 0;
      this.addedItems[itemCode]++;
    } else {
      console.error(`${itemCode} not found`);
    }
  }

  get total() {
    return this.toCurrencyFormat(1);
  }
}

module.exports = ShoppingCart;