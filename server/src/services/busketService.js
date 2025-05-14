const { Busket, Product } = require("../../db/models");
const ProductService = require("./productService");
const HttpError = require("../exceptions/HttpError");
const calculateDiscountedPrice = require("../helpers/calculateDiscountedPrice");

class BusketService {
  static async create(user_id, product_id) {
    const product = await ProductService.getById(product_id);

    if (product.status !== "available") {
      throw new HttpError(
        500,
        "Не удалось добавить в козину: продукт недоступен"
      );
    }

    const newRecord = await Busket.create({ user_id, product_id });

    if (!newRecord) {
      throw new HttpError(500, "Не удалось добавить в козину");
    }

    product.status = "reserved";
    await product.save();

    return product;
  }

  static async getAll(user_id) {
    const products = await Busket.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          as: "product",
          where: {
            status: "reserved",
          },
          attributes: {
            exclude: ["buyer_id", "status", "updatedAt"],
          },
          required: true,
        },
      ],
      attributes: [],
      raw: true,
      nest: true,
    });

    return products.map((p) => ({
      ...p.product,
      endPrice: calculateDiscountedPrice(p.product.price, p.product.discount),
    }));
  }

  static async deleteById(user_id, id) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw HttpError.BadRequestError("Продукт не найден");
    }

    const deleteCounter = await Busket.destroy({
      where: { user_id, product_id: id },
    });

    if (!deleteCounter) {
      throw new HttpError(500, "Не удалось удалить продукт");
    }

    product.status = "available";
    await product.save();

    return product;
  }

  static async deleteAll(user_id) {
    const baskets = await Busket.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          as: "product",
          where: { status: "reserved" },
          required: true,
        },
      ],
    });

    for (const basket of baskets) {
      await basket.product.update({ status: "available" });
    }

    await Busket.destroy({
      where: { user_id },
    });

    return;
  }
}

module.exports = BusketService;
