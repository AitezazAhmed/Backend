const express = require('express')
const { userhandlersignup, userloginhandle } = require("../controller/user")
const router = express.Router()
router.post("/signup", userhandlersignup)
router.post("/login",userloginhandle)
module.exports = router