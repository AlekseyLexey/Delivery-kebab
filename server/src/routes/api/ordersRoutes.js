const router = require("express").Router();
const OrderController = require("../../controllers/orderController");

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);

module.exports = router;
