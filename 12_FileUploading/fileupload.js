const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.use(express.static("public"));
// Serve Static Files
const staticRoute = require("../routes/staticroutes")
const uploadfile = require("../routes/upload")
// Render Upload Page
app.use("/",  staticRoute);
// Handle File Upload
app.use("/",uploadfile);
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
