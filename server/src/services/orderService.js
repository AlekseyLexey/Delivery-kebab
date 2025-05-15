const { Product, User } = require("../../db/models");
const HttpError = require("../exceptions/HttpError");
const calculateDiscountedPrice = require("../helpers/calculateDiscountedPrice");

class OrderService {
  static async create(buyer_id, productsIds) {
    const user = await User.findByPk(buyer_id);

    const products = await Product.findAll({ where: { id: productsIds } });

    const totalCount = products.reduce(
      (acc, p) => acc + Number(calculateDiscountedPrice(p.price, p.discount)),
      0
    );

    if (user.wallet < totalCount) {
      throw HttpError.BadRequestError("Недостаточно средств");
    }

    user.wallet = user.wallet - totalCount;
    await user.save();

    await Product.update(
      {
        status: "delivery",
        buyer_id: buyer_id,
      },
      {
        where: { id: productsIds },
      }
    );

    return products;
  }

  static async getAll(buyer_id) {
    const products = await Product.findAll({
      where: { buyer_id },
      attributes: {
        exclude: ["buyer_id", "updatedAt"],
      },
    });

    return products;
  }
}

module.exports = OrderService;
