const express = require("express")
const app = express()
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const dbConnection = require("../config/auth");
const cookieParser=require("cookie-parser")
const userModel = require("../models/user");
const {restrictTOLoggedInUserOnly}=require("../middleware/auth")
const staticRoute = require("../routes/staticroutes")
const userRoute = require("../routes/user")
const urlRoute = require("../routes/urlroute")
app.use(cookieParser())
app.use("/",urlRoute,restrictTOLoggedInUserOnly)
app.use("/", userRoute);
app.use("/",  staticRoute);
app.listen(3000)