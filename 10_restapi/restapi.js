const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");
const fs=require("fs")
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
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

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body);

    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to save user data" });
        }
        return res.status(201).json({ status: "success", user: newUser });
    });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
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
