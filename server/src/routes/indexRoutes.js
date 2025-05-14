const router = require("express").Router();

const {
  registration,
  login,
  logout,
  refresh,
} = require("../controllers/userController");
const productsRoute = require("./api/productsRoute");
const busketRoute = require("./api/busketRoute");

const authMiddleware = require("../middlewares/authMiddleware");
const checkCustomerMiddleware = require("../middlewares/checkCustomerMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

router.use("/products", authMiddleware, productsRoute);
router.use("/busket", authMiddleware, checkCustomerMiddleware, busketRoute);

module.exports = router;
