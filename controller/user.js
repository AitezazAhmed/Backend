const userModel = require("../models/user");
// const {v4: uuidv4}=require("uuid") use for state full
const {setUser}=require("../service/auth");
const userhandlersignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;  // Destructuring

        // Create new user in database
        await userModel.create({
            username: name,
            email: email,
            password: password
        });
        return res.redirect("/login");
    } catch (error) { 
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
    const userloginhandle = async (req, res) => {
   
        const {email, password } = req.body;  // Destructuring

       const user= await  userModel.findOne({email,password})
       if(!user)
        return res.render("login",{
    error:"invalid"
    })
    // const sessionId=uuidv4();
    // setUser(sessionId,user);
   const token= setUser(user)
    // res.cookie("uid",sessionId)
    res.cookie("uid",token)
    return res.redirect("/")

};


module.exports = { userhandlersignup, userloginhandle };
