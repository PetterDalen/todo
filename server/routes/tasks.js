// server/routes/tasks.js
const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTask = new Task({ name });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all tasks
router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany();
    res.status(200).json({ message: "All tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
