const mongoose=require("mongoose")
const Student= new mongoose.Schema({
    name: String,
    marks: Number,
  
})
const StudentM=mongoose.model("student",Student)
module.exports=StudentM