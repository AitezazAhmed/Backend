// const sessionIdToUserMap = new Map();   Use for state full 
const jwt =require("jsonwebtoken");
const secret= "Aitezaz!@#$%^&*"
function setUser(user) {
    // sessionIdToUserMap.set(id, user);  Use for state full 
    return jwt.sign(
        {
            _id:user.id,
            email:user.email
        },
        secret
    )
}

function getUser(token) {
    // return sessionIdToUserMap.get(id);  Use for state full 
    if(!token) return null
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser
};
