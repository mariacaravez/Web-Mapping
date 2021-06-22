require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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
app.use(express.json);

app.use(cookieParser());
app.use(
  session({
    key: "userid",
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.S_MAX_AGE),
    },
  })
);

/* ROUTES */
app.use("authentication", require("./routes/authentication"));

// Serves static pages
app.use("/", express.static(path.join(__dirname, "/public/index.html")));

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
