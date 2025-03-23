const userModel = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

const userhandlersignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render("signup", { error: "Email already in use" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in database
        await userModel.create({
            username: name,
            email: email,
            password: hashedPassword
        });

        return res.redirect("/login");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const userloginhandle = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.render("login", { error: "Invalid email or password" });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("login", { error: "Invalid email or password" });
        }

        // Generate JWT or session token
        const token = setUser(user);
        res.cookie("uid", token, { httpOnly: true, secure: true });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { userhandlersignup, userloginhandle };

// const userModel = require("../models/user");
// // const {v4: uuidv4}=require("uuid") use for state full
// const {setUser}=require("../service/auth");
// const userhandlersignup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;  // Destructuring

//         // Create new user in database
//         await userModel.create({
//             username: name,
//             email: email,
//             password: password
//         });
//         return res.redirect("/login");
//     } catch (error) { 
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// };
//     const userloginhandle = async (req, res) => {
   
//         const {email, password } = req.body;  // Destructuring

//        const user= await  userModel.findOne({email,password})
//        if(!user)
//         return res.render("login",{
//     error:"invalid"
//     })
//     // const sessionId=uuidv4();
//     // setUser(sessionId,user);
//    const token= setUser(user)
//     // res.cookie("uid",sessionId)
//     res.cookie("uid",token)
//     return res.redirect("/")

// };


// module.exports = { userhandlersignup, userloginhandle };
