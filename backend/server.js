// --------------------- IMPORT MODULES
const express = require("express");
const app = express();

const { portNumber, db, saltRounds, jwtSecret } = require("./conf.js");

const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./passport-strategie.js");

// --------------------- USE MODULES

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// --------------------- ROUTES

app.get("/", (req, res) => {
  res.send("/");
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  const pseudo = req.body.pseudo;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) console.log(err);
    password = hash;

    db.query(
      "INSERT INTO users (email, password, pseudo) values (?,?,?)",
      [email, password, pseudo],
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur");
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

app.post("/signin", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Authentication failed",
        user,
        err,
        info
      });
    }
    req.login(user, { session: false }, loginErr => {
      if (loginErr) {
        return res.status(401).json({
          message: "Authentication failed",
          user,
          loginErr
        });
      }
      user.password = undefined;
      const token = jwt.sign(JSON.stringify(user), jwtSecret);
      return res.status(200).json({ token, user });
    });
  })(req, res);
});

// --------------------- SERVER LAUNCH

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
