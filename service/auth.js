// const sessionIdToUserMap = new Map();   Use for state full 
const jwt = require("jsonwebtoken");
const userModel = require("../models/user"); // Import user model
require("dotenv").config();
const SECRET = process.env.secret
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,  // ✅ Ensure we store `_id`
            email: user.email
        },
        SECRET,
        { expiresIn: "1h" } // Optional: Set token expiration
    );
}

async function getUser(token) {
    if (!token) return null;
    try {
        // Decode the JWT token
        const decoded = jwt.verify(token, SECRET);
        
        // Fetch user from MongoDB using `_id`
        const user = await userModel.findById(decoded._id);
        
        return user || null;  // ✅ Return full user object
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return null;
    }
}

module.exports = { setUser, getUser };
