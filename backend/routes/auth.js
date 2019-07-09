const express = require("express");
const router = express.Router();

const { db, saltRounds, jwtSecret } = require("../conf.js");

const bcrypt = require("bcrypt");

const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport-strategie.js");

router.post("/signup", (req, res) => {
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

router.post("/signin", (req, res) => {
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

module.exports = router;
