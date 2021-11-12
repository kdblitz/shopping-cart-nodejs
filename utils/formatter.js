const toCurrencyFormat = function (val) {
  const absVal = Math.abs(val);
  if (Number.isNaN(absVal)) return NaN;

  return val >= 0 ? `$${absVal.toFixed(2)}` : `-$${absVal.toFixed(2)}`;
}

module.exports = {
  toCurrencyFormat
}