const express = require("express")
const app = express()
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const dbConnection = require("../config/auth");
const cookieParser=require("cookie-parser")
const userModel = require("../models/user");
const { restrictToLoggedinUserOnly}=require("../middleware/auth")
const staticRoute = require("../routes/staticroutes")
const userRoute = require("../routes/user")
const urlRoute = require("../routes/urlroute")
// const staticRoute = require("../routes/staticroutes")
const uploadfile = require("../routes/upload")
app.use(cookieParser())
app.use("/url",  restrictToLoggedinUserOnly, urlRoute);
app.use("/", userRoute);
app.use("/",  staticRoute);
// Render Upload Page
app.use("/",  staticRoute);
// Handle File Upload
app.use("/",uploadfile);
app.listen(3000)