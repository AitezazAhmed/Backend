

const express = require('express');
const router = express.Router();

router.get("/url", (req, res) => {
    return res.render("url");
});

module.exports = router;

