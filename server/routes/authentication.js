/*
* Authentication Routes using jsonwebtoken
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
  console.log("creating new user...");

  // Create object from request body
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check whether user exists 
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // Reject request if user exists
    if (user.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt); 
    // Insert user into database with encrypted password
    let newUser = await db.query(
      "INSERT INTO account(firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, password",
      [firstname, lastname, email, bcryptPassword]
    );
    // Create token for user
    const jwtToken = tokenGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* Login User */

router.post("/api/login", validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    const jwtToken = tokenGenerator(user.rows[0].user_id);
    return res.json({ message: "Authentication successful!", jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/api/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;
