const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  console.log("Inside authorize middleware.")

  // Get token from header
  // Original: // const token = req.header("jwt_token");
  const token = req.headers["x-access-token"];

  // Check if not token
  if (!token) {
    res.send("Authorization Denied.");
  }

  // Verify token
  else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You are not authenticated." });
      } else {
        req.userid = decoded.id;
      }
    });
  }
  next();
};
