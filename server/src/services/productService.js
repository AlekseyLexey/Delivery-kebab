const { Product, User } = require("../../db/models");
const HttpError = require("../exceptions/HttpError");

class ProductService {
  static async create(courier_id, data) {
    if (!data.name) {
      throw HttpError.BadRequestError("Нет имени продукта");
    }

    const newProduct = await Product.create({ ...data, courier_id });

    if (!newProduct) {
      throw new HttpError(500, "Не удалось создать продукт");
    }

    return newProduct;
  }

  static async getAll(city) {
    const products = await Product.findAll({
      where: { status: "available" },
      include: [
        {
          model: User,
          as: "courier",
          where: {
            role: "courier",
            city: city,
          },
          attributes: [],
        },
      ],
      attributes: {
        exclude: ["buyer_id", "status", "updatedAt"],
      },
    });

    return products;
  }

  static async getById(id) {
    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      throw HttpError.BadRequestError("Продукт не найден");
    }

    return product;
  }

  static async update(id, courier_id, data) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw HttpError.BadRequestError("Продукт не найден");
    }

    if (product.courier_id !== courier_id) {
      throw new HttpError(403, "Нет прав");
    }

    const [counter, updateProduct] = await Product.update(data, {
      where: { id },
      returning: true,
    });

    if (!counter) {
      throw new HttpError(500, "Не удалось обновить объявление");
    }

    return updateProduct;
  }

  static async delete(id, courier_id) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw HttpError.BadRequestError("Продукт не найден");
    }

    if (product.courier_id !== courier_id) {
      throw new HttpError(403, "Нет прав");
    }

    const deleteCounter = await Product.destroy({
      where: { id, courier_id },
    });

    if (!deleteCounter) {
      throw new HttpError(500, "Не удалось удалить продукт");
    }

    return product;
  }
}

module.exports = ProductService;
