const authAdmin = (req, res, next) => {
  console.log("Admin auth is being checked !!!");
  const token = "xyz";
  const isAdminAuthenticated = token === "xyz";
  // if it will not match it will not pass the auth.

  if (!isAdminAuthenticated) {
    res.status(401).send("Unauthorized request !!!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is being checked !!!");
  const token = "xyz";
  const isAdminAuthenticated = token === "xyz";

  if (!isAdminAuthenticated) {
    res.status(401).send("Unauthorized request !!!");
  } else {
    next();
  }
};
module.exports = {
  authAdmin,
  userAuth,
};
