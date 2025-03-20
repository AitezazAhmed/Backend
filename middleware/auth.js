const {getUser}= require("../service/auth")

async function restrictTOLoggedInUserOnly(req,res,next) {
    const useruid=req.cookie.uid
    if(!useruid)
        return res.redirect("/login")
    const user=getUser(useruid)
    if(!user)
        return res.redirect("/login")
    req.user=user
    next()
}
module.exports={
    restrictTOLoggedInUserOnly
}