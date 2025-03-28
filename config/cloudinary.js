const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Upload File to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("✅ File uploaded to Cloudinary:", response.secure_url);
        // Delete file from local storage after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        fs.unlinkSync(localFilePath); // Delete file if upload fails
        return null;
    }
};

module.exports = { uploadOnCloudinary };  // ✅ FIXED EXPORT

