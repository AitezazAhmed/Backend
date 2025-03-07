const express = require('express')
const app = express()


app.set("view engine", 'ejs')

app.get('/', (req, res) => {
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