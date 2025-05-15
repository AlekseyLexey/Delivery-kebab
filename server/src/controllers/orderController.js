const OrderService = require("../services/orderService");

class OrderController {
  static async create(req, res, next) {
    try {
      const { id } = res.locals.user;
      const productsIds = req.body;

      const products = await OrderService.create(id, productsIds);

      return res.status(201).json(products);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { id } = res.locals.user;

      const orders = await OrderService.getAll(id);

      return res.status(200).json(orders);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = OrderController;
