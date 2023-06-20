// Package imports
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();

// Constant Imports
const constants = require('./config.constants');
const User = require('../modules/auth/auth.model');

const passportGoogleConfig = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}).then((user) => cb(null, user));
  });


  // Adding middleware
  passport.use(
      new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              const existingUser = await User.findOne({googleId: profile.id});

              if (existingUser) {
                return done(null, existingUser, {message: constants.LOGGED_IN_MSG});
              }

              const newUser = new User({
                googleId: profile?.id,
                displayName: profile?.displayName,
                profilePicture: profile?.photos[0]?.value,
                email: constants.EMAIL_MSG,
              });

              await newUser.save();
              done(null, newUser, {message: constants.LOGGED_IN_MSG});
            } catch (error) {
              console.log(constants.GOOGLE_SIGN_CATCH_PRBLM, error);
              done(null, newUser, {message: constants.FAILED_LOGGED_IN_MSG});
            }
          },
      ),
  );
};

module.exports = passportGoogleConfig;
