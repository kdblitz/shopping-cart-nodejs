const createCartData = (productCode, quantity, productMap) => {
  const { name, price } = productMap[productCode];
  return {
    item: name,
    price,
    quantity,
    subtotal: price * quantity,
  };
};

module.exports = createCartData;
