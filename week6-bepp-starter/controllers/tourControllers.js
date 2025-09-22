const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /api/tours
const getAllTours = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tours = await Tour.find({ user_id }).sort({ createdAt: -1 });
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve tours" });
  }
};

// POST /api/tours
const createTour = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newTour = await Tour.create({ ...req.body, user_id });
    return res.status(201).json(newTour);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create tour", error: error.message });
  }
};

// GET /api/tours/:id
const getTourById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Tour not found" });
  }

  try {
    const user_id = req.user._id;
    const tour = await Tour.findOne({ _id: id, user_id });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    return res.status(200).json(tour);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// PUT /api/tours/:id  (or PATCH if your tests require)
const updateTour = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Tour not found" });
  }

  try {
    const user_id = req.user._id;
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: id, user_id },
      { ...req.body },
      { new: true }
    );
    if (!updatedTour) return res.status(404).json({ message: "Tour not found" });
    return res.status(200).json(updatedTour);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// DELETE /api/tours/:id
const deleteTour = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Tour not found" });
  }

  try {
    const user_id = req.user._id;
    const deletedTour = await Tour.findOneAndDelete({ _id: id, user_id });
    if (!deletedTour) return res.status(404).json({ message: "Tour not found" });
    // choose 200 with payload (safer for tests)
    return res.status(200).json(deletedTour);
    // or: return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};