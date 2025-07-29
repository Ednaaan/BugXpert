const express = require('express');
const Bug = require("../models/bug");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a bug
router.post("/createBug", auth, async (req, res) => {
  try {
    const bug = new Bug({
      ...req.body,
      reportedBy: req.user.id
    });

    await bug.save();
    res.status(201).json({ message: "Bug created successfully", bug });
  } catch (err) {
    res.status(500).send("Error creating the bug: " + err.message);
  }
});

// Get all bugs
router.get("/getAllBugs", auth, async (req, res) => {
  try {
    const bugs = await Bug.find().populate("reportedBy assignedTo", "name email");
    res.json(bugs);
  } catch (err) {
    res.status(500).send("Error fetching bugs: " + err.message);
  }
});

// Update a bug
router.put("/updateBug/:id", auth, async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).send("Bug not found");

    res.json({ message: "Bug updated", bug });
  } catch (err) {
    res.status(500).send("Error updating bug: " + err.message);
  }
});

// Delete a bug
router.delete("/deleteBug/:id", auth, async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).send("Bug not found");

    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).send("Error deleting bug: " + err.message);
  }
});

module.exports = router;
