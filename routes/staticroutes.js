const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const {restrictTo} = require("../middleware/auth");
// This will now correctly serve /signup
router.get("/", (req, res) => {
    return res.render("home");
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login"); 
});


router.get("/admin", restrictToLoggedinUserOnly, restrictTo("admin"), (req, res) => {
    return res.render("admin"); 
  });


router.get("/upload", restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Get pagination parameters from query string
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalFiles = user.uploadedFiles.length;
        const totalPages = Math.ceil(totalFiles / limit);

        // Get paginated files
        const startIndex = (page - 1) * limit;
        const paginatedFiles = user.uploadedFiles.slice(startIndex, startIndex + limit);

        res.render("upload", { 
            uploadedFiles: paginatedFiles,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error fetching uploaded files:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
