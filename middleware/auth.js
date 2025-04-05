const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = await getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}
function restrictTo(role) {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login"); // Ensure user is logged in

    if (req.user.role !== role) {
      return res.status(403).send("Access Denied: You do not have permission.");
    }

    next();
  };
}

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

module.exports = {
  restrictToLoggedinUserOnly,
  restrictTo
  // checkAuth,
};