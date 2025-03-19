const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
})
.patch((req,res)=>{
    return res.json({staus:"panding"})
})
.delete((req,res)=>{
    return res.json({staus:"panding"})
})

// Get all users
app.get("/users", (req, res) => {
    return res.json(users);
});

// Get user by ID
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);

//     if (!user) {
//         return res.status(404).json({ error: "User not found" });
//     }

//     return res.json(user);
// });
