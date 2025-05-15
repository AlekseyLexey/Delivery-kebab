const router = require("express").Router();

const {
  registration,
  login,
  logout,
  refresh,
} = require("../controllers/userController");
const productsRoute = require("./api/productsRoute");
const busketRoute = require("./api/busketRoute");
const orderRoute = require("./api/ordersRoutes");
const courierOrderRoute = require("./api/courierOrdersRoute");

const authMiddleware = require("../middlewares/authMiddleware");
const checkCustomerMiddleware = require("../middlewares/checkCustomerMiddleware");
const checkCourierMiddleware = require("../middlewares/checkCourierMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

router.use("/products", authMiddleware, productsRoute);
router.use("/orders", authMiddleware, checkCustomerMiddleware, orderRoute);
router.use("/busket", authMiddleware, checkCustomerMiddleware, busketRoute);
router.use(
  "/courier/orders",
  authMiddleware,
  checkCourierMiddleware,
  courierOrderRoute
);

module.exports = router;
