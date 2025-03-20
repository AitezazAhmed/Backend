const express = require("express")
const app = express()
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const dbConnection = require("../config/auth");
const userModel = require("../models/user");
const signup = require("../routes/staticroutes")
const signuproute = require("../routes/user")
app.use("/signup", signup)
app.use("/signup", signuproute)
app.listen(3000)