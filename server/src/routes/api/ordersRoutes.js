const router = require("express").Router();
const OrderController = require("../../controllers/orderController");

const checkCustomerMiddleware = require("../../middlewares/checkCustomerMiddleware");

router.post("/", checkCustomerMiddleware, OrderController.create);
router.get("/", checkCustomerMiddleware, OrderController.getAll);

module.exports = router;
