const HttpError = require("../exceptions/HttpError");

module.exports = function calculateDiscountedPrice(price, discount) {
  if (discount < 0 || discount > 100) {
    throw HttpError("Скидка должна быть в диапазоне от 0 до 100%");
  }
  if (price < 0) {
    throw HttpError("Цена не может быть отрицательной");
  }
  return (price * (1 - discount / 100)).toFixed();
};
