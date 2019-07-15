const express = require("express");
const router = express.Router();

const { db, saltRounds, jwtSecret } = require("../conf.js");

const bcrypt = require("bcrypt");

const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport-strategie.js");

//------------------------------------------- INSCRIPTION

router.post("/signup", (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const pseudo = req.body.pseudo;
  if (pseudo !== "") {
    if (password === passwordConfirm) {
      if (email.includes("@") && email.includes(".")) {
        db.query(
          "SELECT email FROM users WHERE email = ?",
          email,
          (err, results) => {
            if (err) {
              res.status(500).send("Erreur");
            } else if (results.length > 0) {
              res.status(401).send({
                message: "L'adresse email existe déjà."
              });
            } else {
              bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) res.status(500).send("Erreur lors du hash.");
                password = hash;

                db.query(
                  "INSERT INTO users (email, password, pseudo) values (?,?,?)",
                  [email, password, pseudo],
                  (err, results) => {
                    if (err) {
                      res.status(500).send("Erreur lors de l'inscription");
                    } else {
                      res.status(200).send({ message: "Inscription réussie" });
                    }
                  }
                );
              });
            }
          }
        );
      } else {
        res.status(401).send({
          message: "L'adresse email doit être valide."
        });
      }
    } else {
      res.status(401).send({
        message: "Les mots de passe doivent être identiques."
      });
    }
  } else {
    res.status(401).send({
      message: "Le pseudo ne peut être vide."
    });
  }
});

//------------------------------------------- CONNEXION

router.post("/signin", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).send({
        message: "Authentication failed",
        user,
        err,
        info
      });
    }
    req.login(user, { session: false }, loginErr => {
      if (loginErr) {
        return res.status(401).send({
          message: "Authentication failed",
          user,
          loginErr
        });
      }
      user.password = undefined;
      const token = jwt.sign(JSON.stringify(user), jwtSecret);
      return res.status(200).send({ token, user });
    });
  })(req, res);
});

module.exports = router;
