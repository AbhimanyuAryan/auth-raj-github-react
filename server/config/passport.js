const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require('passport-github2').Strategy
const configAuth = require("./auth");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            email: "Email not found"
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            password: "Password is wrong"
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: configAuth.githubAuth.appID,
      clientSecret: configAuth.githubAuth.appSecret,
      callbackURL: configAuth.githubAuth.callbackURL,
      profileFields: ["id", "emails", "name"]
    },
    (accessToken, refreshToken, profile, done) =>
      findUserOrCreate(profile, done)
  )
);

const findUserOrCreate = (profile, done) => {
  User.findOne({ email: profile.emails[0].value }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      const new_user = new User();

      new_user.name = `${profile.name.givenName} ${profile.name.familyName}`;
      new_user.email = profile.emails[0].value;

      new_user.save((err, new_user) => {
        if (err) return done(err);
        return done(null, new_user);
      });
    } else {
      return done(null, user);
    }
  });
};
