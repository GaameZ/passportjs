// --------------------- IMPORT MODULES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { portNumber } = require("./conf.js");

// --------------------- USE MODULES

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// --------------------- ROUTES

app.get("/", (req, res) => {
  res.send("/");
});

app.use("/auth", require("./routes/auth"));

// --------------------- SERVER LAUNCH

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
