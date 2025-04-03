const express = require("express");
const mongoose = require("mongoose");
require("../config/dbfilterings-searching"); // Ensure database connection is imported

const app = express();
const PORT = 3000;

// Define Student Model (Ensure this matches your database structure)
const Student = mongoose.model("Student", {
  name: String,
  marks: Number,
});

// API to get students with marks > 80
app.get("/students/high-scorers", async (req, res) => {
  try {
    const highScorers = await Student.find({ marks: { $gt: 80 } }); // Filtering
    res.json(highScorers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/student/search", async (req, res) => {
    try {
      const query = req.query.name; // Get search keyword from query params
      const students = await Student.find({ name: { $regex: query, $options: "i" } }); // Case-insensitive search
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
