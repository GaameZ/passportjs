const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { db, jwtSecret } = require("./conf");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.query(
        `SELECT id , email , password , pseudo FROM users WHERE email = ?`,
        [email, password],
        (err, results) => {
          let user;
          if (results) {
            user = results[0];
          }

          if (err || user === undefined) {
            return done(null, false, {
              message: "Adresse mail ou mot de passe incorrect."
            });
          }
          bcrypt.compare(password, user.password, (errBcrypt, result) => {
            if (errBcrypt) return done(errBcrypt);
            if (!result) {
              return done(null, false, {
                message: "Adresse mail ou mot de passe incorrect."
              });
            }
            return done(null, results[0]);
          });
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);
