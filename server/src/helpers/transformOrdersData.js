const calculateDiscountedPrice = require("./calculateDiscountedPrice");

module.exports = function transformOrdersData(originalData) {
  return Object.values(
    originalData.reduce((acc, item) => {
      const { buyer, ...product } = item;
      const buyerId = buyer.id;

      if (!acc[buyerId]) {
        acc[buyerId] = {
          customer: buyer,
          products: [],
          totalAmount: 0,
          totalItems: 0,
        };
      }

      acc[buyerId].products.push(product);

      const discountedPrice = Number(
        calculateDiscountedPrice(product.price, product.discount)
      );
      acc[buyerId].totalAmount += discountedPrice;
      acc[buyerId].totalItems += 1;

      return acc;
    }, {})
  );
};
