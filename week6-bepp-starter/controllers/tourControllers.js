const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tours = await Tour.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tours" });
  }
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newTour = await Tour.create({ ...req.body, user_id });
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: "Failed to create tour", error: error.message });
  }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tour not found" });
  }

  try {
    const user_id = req.user._id;
    const tour = await Tour.findById(id)
      .where("user_id")
      .equals(user_id);
    if (!tour) {
      return res.status(404).json({ message:  "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const tour = await Tour.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const tour = await Tour.findOneAndDelete({
      _id: id,
      user_id: user_id,
    });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};