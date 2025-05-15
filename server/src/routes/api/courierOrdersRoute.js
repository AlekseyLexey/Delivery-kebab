const router = require("express").Router();
const CourierOrderController = require("../../controllers/courierOrderController");

router.get("/", CourierOrderController.getAll);

module.exports = router;
