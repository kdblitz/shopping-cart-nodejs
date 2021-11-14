class CartItem {
  item; // string
  price; // number
  quantity; // number
  subtotal; // number

  constructor(productCode, quantity, productMap) {
    const { name, price } = productMap[productCode];
    this.item = name;
    this.price = price;
    this.quantity = quantity;
    this.subtotal = price * quantity;
  }
}

module.exports = CartItem;
module.exports.new = (productCode, quantity, productMap) =>
  new CartItem(productCode, quantity, productMap);
