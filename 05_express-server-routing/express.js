const express = require('express')
const app = express()

app.get('/',(req,res)=>{
 res.send("Home page")
})

app.get('/about',(req,res)=>{
    res.send("About page")
   })

app.get('/contact',(req,res)=>{
    res.send("Contact page")
   })
app.get('/profile',(req,res)=>{
    res.send("Profile page")
   })

app.listen(3000);

