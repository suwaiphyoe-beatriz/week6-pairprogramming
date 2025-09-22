const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth)
router.get("/", getAllTours);

router.post("/", createTour);
router.get("/:id", getTourById);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
