const router = require("express").Router();

const {
  registration,
  login,
  logout,
  refresh,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

module.exports = router;
