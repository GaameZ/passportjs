const express = require("express");
const app = express();

const { portNumber, db, saltRounds } = require("./conf.js");

const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
