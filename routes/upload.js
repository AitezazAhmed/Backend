const express = require('express');
const router = express.Router();
const { upload } = require("../middleware/multer");
const { uploadOnCloudinary } = require("../config/cloudinary");
const userModel = require("../models/user");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

router.post("/upload", restrictToLoggedinUserOnly, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            return res.status(500).send("Cloudinary upload failed.");
        }

        // Find user
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Save image info to user's uploadedFiles
        user.uploadedFiles.push({
            filename: req.file.originalname,
            filePath: cloudinaryResponse.secure_url
        });

        await user.save();

        res.redirect("/upload"); // ✅ Redirect after successful upload
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
