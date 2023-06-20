// Package imports
const GitHubStrategy = require('passport-github2').Strategy;
const env = require('dotenv').config();

// Constant imports
const constants = require('./config.constants');
const User = require('../modules/auth/auth.model');

const passportGithubConfig = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}).then((user) => cb(null, user));
  });

  // Creating Github Strategy
  passport.use(
      new GitHubStrategy(
          {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              const existingUser = await User.findOne({githubId: profile.id});

              if (existingUser) {
                return done(null, existingUser, {message: constants.LOGGED_IN_MSG});
              }

              const newUser = new User({
                githubId: profile?.id,
                displayName: profile?.displayName,
                profilePicture: profile?.photos[0]?.value,
                email: constants.EMAIL_MSG,
              });

              await newUser.save();
              done(null, newUser, {message: constants.LOGGED_IN_MSG});
            } catch (error) {
              console.log(constants.GITHUB_SIGN_CATCH_PRBLM, error);
              done(null, newUser, {message: constants.FAILED_LOGGED_IN_MSG});
            }
          },
      ),
  );
};

module.exports = passportGithubConfig;
