const express = require('express');
const router = express.Router();

// This will now correctly serve /signup
router.get("/", (req, res) => {
    return res.render("signup");
});

module.exports = router;
