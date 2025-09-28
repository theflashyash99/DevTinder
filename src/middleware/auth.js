const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
// Read the token from the req cookies.
 const cookies = req.cookies;
 const {token} = cookies;
 if(!token){
  throw new Error ("The token not available");
 }

 const decordedData = jwt.verify(token,"DEV@Tinder$790");
  
 const {id} = decordedData;

 const user = await User.findOne({_id: id});
if(!user){
  throw new Error ("User does not exist in Database!!!")

}

res.send(user);


// Validate the token
// find the user in DB



};
module.exports = {
  userAuth,
};
