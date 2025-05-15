const CourierOrderService = require("../services/courierOrderService");

class CourierOrderController {
  static async getAll(req, res, next) {
    try {
      const { id } = res.locals.user;

      const orders = await CourierOrderService.getAll(id);

      return res.status(200).json(orders);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CourierOrderController;
