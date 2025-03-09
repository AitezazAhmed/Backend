const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://0.0.0.0/Backend")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });


module.exports=connection