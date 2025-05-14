const BusketService = require("../services/busketService");

class BusketController {
  static async create(req, res, next) {
    try {
      const user_id = res.locals.user.id;
      const { product_id } = req.body;

      const product = await BusketService.create(user_id, product_id);

      return res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { id } = res.locals.user;

      const products = await BusketService.getAll(id);

      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = res.locals.user.id;

      await BusketService.deleteById(user_id, id);

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }

  static async deleteAll(req, res, next) {
    try {
      const user_id = res.locals.user.id;

      await BusketService.deleteAll(user_id);

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BusketController;
