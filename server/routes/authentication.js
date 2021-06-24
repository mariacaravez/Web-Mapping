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

router.post("/api/new-user", validate, async (req, res) => {
    console.log("* NEW-USER BEGINS *\n")
    const { firstname, lastname, email, password } = req.body;
  
    console.log("Received Request for user: ", firstname, lastname, email, password);
  
    try {
      // TESTING
      console.log("Checking DB for email...\n")
  
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email
      ]);
  
      if (user.rows.length > 0) {
  
        // TESTING
        console.log("User in table...\n")
  
        return res.status(401).json("User already exist!");
      }
      // TESTING
      console.log("Creating encrypted password...\n")
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      // TESTING
      console.log("Inserting user into query...\n")
  
      let newUser = await db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstname, lastname, email, bcryptPassword]
      );
      // TESTING
      console.log("New user was made: ", newUser);
  
      // TESTING
      console.log("Creating token...\n");
  
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      // TESTING
      console.log("* NEW-USER ENDS *")
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
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
