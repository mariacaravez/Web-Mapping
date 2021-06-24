require("dotenv").config({path: "../.env"});

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const db = require("./db");
const validate = require("./middleware/validate");


const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.S_MAX_AGE),
    },
  })
);

/* ROUTES */
// app.use("authentication", require("./routes/authentication"));

// Serves static pages
app.use("/", express.static(path.join(__dirname, "index.html")));

app.post("/api/new-user", validate, async (req, res) => {
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

app.post("/api/login", validate, async (req, res) => {

  console.log("\n*** LOGIN API BEGINS *** \nLogging in user...\n");

  const { email, password } = req.body;
  console.log("Credentials received: Email:", email, "Password: ", password);

  try {
    console.log("\nChecking Database for email...\n");
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      console.log("Didn't find email.\n")
      return res.status(401).json("Invalid Credential");
    }

    console.log("Email found. Encrypting password...")
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      console.log("Invalid password from user.\n")
      return res.status(401).json("Invalid Credential");
    }

    console.log("Valid Password. Creating token for user...")
    const jwtToken = jwtGenerator(user.rows[0].userid);
    console.log("Token created.\n *** LOGIN API ENDS ***")
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(_dirname, "build", "index.html"))
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
