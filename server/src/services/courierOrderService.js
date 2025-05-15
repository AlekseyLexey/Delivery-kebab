const { Product, User } = require("../../db/models");
const HttpError = require("../exceptions/HttpError");
const calculateDiscountedPrice = require("../helpers/calculateDiscountedPrice");
const transformOrdersData = require("../helpers/transformOrdersData");

class CourierOrderService {
  static async getAll(courier_id) {
    const products = await Product.findAll({
      where: { courier_id, status: "delivery" },
      include: [
        {
          model: User,
          as: "buyer",
          attributes: ["id", "phone", "username", "email", "location"],
        },
      ],
      attributes: {
        exclude: ["courier_id", "status", "updatedAt", "buyer_id"],
      },
      raw: true,
      nest: true,
    });

    return transformOrdersData(products);
  }
}

module.exports = CourierOrderService;
