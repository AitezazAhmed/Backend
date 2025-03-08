const express = require('express')
const app = express()
const morgan = require('morgan')   // tells the response time

app.set("view engine", 'ejs')
app.use(morgan("dev"))
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

app.listen(3000);