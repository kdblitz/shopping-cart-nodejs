const toCurrencyFormat = function (val) {
  return `$${Number(val).toFixed(2)}`;
}

module.exports = {
  toCurrencyFormat
}