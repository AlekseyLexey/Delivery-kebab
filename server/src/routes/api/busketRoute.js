const router = require("express").Router();
const BusketController = require("../../controllers/busketController");

router.post("/", BusketController.create);
router.get("/", BusketController.getAll);
router.delete("/:id", BusketController.deleteById);
router.delete("/", BusketController.deleteAll);

module.exports = router;
