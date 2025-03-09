const express = require('express')
const app = express()
const morgan = require('morgan')   // tells the response time
const dbConnection = require("../config/db");
const userModel = require("../models/user");

app.set("view engine", 'ejs')
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use((req,res,next)=>{
    console.log("i am middleware")
    next()
})

app.get('/',((req,res,next)=>{                  // middleware for partical route
    console.log("i am middleware for home")
    next()
}), (req, res) => {
    res.render("index")
})

app.get('/about', (req, res) => {
    res.send("About page")
})

app.get('/contact', (req, res) => {
    res.send("Contact page")
})

app.get('/profile', (req, res) => {
    res.send("Profile page")
})
app.post("/get-form-data",(req,res)=>{
    res.send("Form Submitted")
    console.log(req.body)
})
// Basic Crud Opertions

// Create
app.get('/register',(req, res)=>{
    res.render("register")
    })
app.post('/register', async(req, res)=>{
    const {name,email,password}=req.body   // this is called restructing
    await userModel.create({
        username:name,
        email:email,
        password:password
    })
    res.send("You Are Official Registerd")
    console.log(req.body)
        })
// Read

app.get("/get-user-data",(req,res)=>{
    userModel.find().then((users)=>{  // u can also add condition inside the find (here in the object formate{username:"a" here is a condition which give u the user which name starts with a})
        res.send(users)               // findone({username:"a"}) here he find the user with a which registered first
    })
})
// update
app.get("/update-user",async(req,res)=>{
    await userModel.findOneAndUpdate({
        username:"Aitezaz Ahmed",
    },{
        email:"123@gmail.com"
    } 
)
res.send("updated")
})
// delete
app.get("/delete-user",async(req,res)=>{
   await userModel.findOneAndDelete({
    username:"Aitezaz Ahmed"
   }
)
res.send("deleted")
})

app.listen(3000);