const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  // Original: // const token = req.header("jwt_token");
  // const token = req.headers["x-access-token"];

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "Authorization Denied." });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        res.json({auth: false, message: "You are not authenticated."})
      }
      else{
        req.userid = decoded.id;
      }
    });
  

    req.user = verify.user;
    next();
    
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};