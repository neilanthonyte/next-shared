export const toCurrency = (number: number) =>
  "$" + parseFloat(Math.round(number * 100) / 100 + "").toFixed(2);
