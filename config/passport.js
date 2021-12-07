const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/login/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (!req.user) {
          console.log("profile", { profile });
          const newUser = {
            google: {
              id: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              token: accessToken,
            },
          };
          try {
            let user = await User.findOne({ "google.id": profile.id });
            if (user) {
              done(null, user);
            } else {
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          let user = req.user;
          user.google.id = profile.id;
          user.google.firstName = profile.givenName;
          user.google.lastName = profile.familyName;
          user.google.token = accessToken;
          user.google.displayName = profile.displayName;

          user.save(function (err) {
            if (err) throw err;
            return done(null, user);
          });
        }
      }
    )
  );

  passport.use(
    new TwitchStrategy(
      {
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: "/api/auth/twitch/login/callback",
        scope: "user_read",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (!req.user) {
          console.log(1234);
          const newUser = {
            twitch: {
              id: profile.id,
              displayName: profile.display_name,
              token: accessToken,
            },
          };
          try {
            console.log("profileid " + profile.id);
            let user = await User.findOne({ "twitch.id": profile.id });
            if (user) {
              done(null, user);
            } else {
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          let user = req.user;
          user.twitch.id = profile.id;
          user.twitch.token = accessToken;
          user.twitch.displayName = profile.display_name;

          user.save(function (err) {
            if (err) throw err;
            return done(null, user);
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
