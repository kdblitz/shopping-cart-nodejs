class CartItem {
  item;
  price;
  quantity;
  subtotal;

  constructor(productCode, quantity, productMap) {
    const { name, price } = productMap[productCode];
    this.item = name;
    this.price = price;
    this.quantity = quantity;
    this.subtotal = price * quantity;
  }
}

module.exports.new = (productCode, quantity, productMap) =>
  new CartItem(productCode, quantity, productMap);
