// Package imports
const GitHubStrategy = require('passport-github2').Strategy;
const env = require('dotenv').config();
const to = require('await-to-js').default;

// Constant imports
const constants = require('../../constants/constants');
const githubConstants = require('../constants');

// Model imports
const User = require('../../modules/auth/auth.model');

// Logger import
const logger = require('../logger/logger');

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
            if (!profile.id) {
              logger.error(githubConstants.labels.githubPassportStrategy.githubProfile.failure, profile);
              return done(null, false, {message: constants.responseMessages.logInUser.socialLogin.networkError});
            }
            const [userError, existingUser] = await to(User.findOne({githubId: profile.id}));

            if (userError) {
              logger.error(githubConstants.labels.githubPassportStrategy.findingUser.failure, userError);
              return done(null, false, {message: constants.responseMessages.logInUser.failure});
            }

            // If user is already existed in database, just log it in without saving it in db
            if (existingUser) {
              logger.info(githubConstants.labels.githubPassportStrategy.findingUser.success, existingUser);
              return done(null, existingUser, {message: constants.responseMessages.logInUser.success});
            };

            const newUser = new User({
              githubId: profile?.id,
              displayName: profile?.displayName,
              profilePicture: profile?.photos[0]?.value,
            });

            const [newUserSavedError, newUserSaved] = await to(newUser.save());

            if (newUserSavedError) {
              logger.error(githubConstants.labels.githubPassportStrategy.savingNewUser.failure, newUserSavedError);
              done(null, false, {message: constants.responseMessages.logInUser.failure});
            }

            if (newUserSaved) {
              logger.info(githubConstants.labels.githubPassportStrategy.savingNewUser.success, newUserSaved);
              done(null, newUser, {message: constants.responseMessages.logInUser.success});
            } else {
              logger.error(githubConstants.labels.githubPassportStrategy.savingNewUser.failure, newUserSaved);
              done(null, false, {message: constants.responseMessages.logInUser.failure});
            }
          },
      ),
  );
};

module.exports = passportGithubConfig;
