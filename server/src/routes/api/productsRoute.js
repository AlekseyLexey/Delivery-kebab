const router = require("express").Router();
const ProductController = require("../../controllers/productController");

const checkCourierMiddleware = require("../../middlewares/checkCourierMiddleware");
const checkCustomerMiddleware = require("../../middlewares/checkCustomerMiddleware");

router.post("/", checkCourierMiddleware, ProductController.create);
router.get("/", checkCustomerMiddleware, ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", checkCourierMiddleware, ProductController.update);
router.delete("/:id", checkCourierMiddleware, ProductController.delete);

module.exports = router;
