const userModel = require("../models/user");
const userhandlersignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;  // Destructuring

        // Create new user in database
        await userModel.create({
            username: name,
            email: email,
            password: password
        });

        return res.render("signup", { message: "Signup Successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { userhandlersignup };
