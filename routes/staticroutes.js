const express = require('express');
const router = express.Router();

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



module.exports = router;
