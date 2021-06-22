/*
 * Authentication Routes using jsonwebtoken (JWT)
 *
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const validate = require("../middleware/validate.js");
const tokenGenerator = require("../tokenGenerator");
const authorize = require("../middleware/authorize");

/* Create New User */

router.post("/api/new-user", validate, (req, res) => {
  console.log("creating new user...");

  // Create object from request body
  // const { firstname, lastname, email, password } = req.body;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  // Check whether user exists
  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    console.log(err);
  });
  // Reject request if user exists
  if (user.rows.length > 0) {
    res.status(401).json("User already exists!");
  }

  // Encrypt user password
  const salt = bcrypt.genSalt(10);
  const bcryptPassword = bcrypt.hash(password, salt);

  // Insert user into database with encrypted password
  let newUser = db.query(
    "INSERT INTO users(firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING userid, password",
    [firstname, lastname, email, bcryptPassword]
  );
  // Create token for user
  const jwtToken = tokenGenerator(newUser.rows[0].userid);

  res.json({ jwtToken });
});

/* Login User */

router.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/api/login", (req, res) => {

  console.log("Logging in user...");

  const email = req.body.email;
  const password = req.body.password;
  
  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if(err){
      res.send({err: err});
    }

    if(result.length > 0){
        // Checks that the password is correct
      bcrypt.compare(password, result[0].password, (err, response) => {
        if(response) {
                // Token for user initialized
          const jwtToken = tokenGenerator(result[0].userid);
                // Create session for user after validations
          req.session.user = result;
          res.json({auth: true, token: jwtToken, result: result})
        } else{
          res.send({message: "Invalid Credentials"})
        }
      });
    }else {
      res.send({message: "User does not exist."})
    }
  });
});

router.get("/api/verify", authorize, (req, res) => {
  res.send("User is authenticated");
});

module.exports = router;
