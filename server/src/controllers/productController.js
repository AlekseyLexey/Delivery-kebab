const ProductService = require("../services/productService");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductService.getAll();

      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProductController;
