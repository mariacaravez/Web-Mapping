require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.use(session({
  secret: SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.S_MAX_AGE)
  }
}))

/* ROUTES */

app.use("authentication", require("./routes/authentication"));

// Serves static pages
app.use("/", express.static(path.join(__dirname, "/public/index.html")));

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.get("/api/login", (req, res) => {
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user});
  }
  else{
    res.send({loggedIn: false});
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
