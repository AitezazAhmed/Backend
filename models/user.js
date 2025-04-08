const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    username:String,
    email:String, 
   password:String,
   role: { type: String, enum: ["user", "admin"], default: "user" },
   uploadedFiles: [
    {
        filename: String,
        filePath: String,
        uploadedAt: { type: Date, default: Date.now }
    }
]
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel