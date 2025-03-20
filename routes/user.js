const express = require('express')
const { userhandlersignup } = require("../controller/user")
const router = express.Router()
router.post("/", userhandlersignup)
module.exports = router