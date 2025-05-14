const ProductService = require("../services/productService");

class ProductController {
  static async create(req, res, next) {
    try {
      const { id } = res.locals.user;
      const data = req.body;

      const product = await ProductService.create(id, data);

      return res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { city } = res.locals.user;

      const products = await ProductService.getAll(city);

      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductService.getById(id);

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const courier_id = res.locals.user.id;
      const data = req.body;

      const product = await ProductService.update(id, courier_id, data);

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const courier_id = res.locals.user.id;

      await ProductService.delete(id, courier_id);

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProductController;
