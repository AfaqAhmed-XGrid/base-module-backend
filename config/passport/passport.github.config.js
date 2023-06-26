// Package imports
const GitHubStrategy = require('passport-github2').Strategy;
const env = require('dotenv').config();
const to = require('await-to-js').default;

// Constant imports
const globalConstants = require('../../constants/constants');
const configConstants = require('../constants');

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
              logger.error(configConstants.labels.githubPassportStrategy.githubProfile.failure, profile);
              return done(null, false, {message: globalConstants.responseMessages.logInUser.socialLogin.networkError});
            }
            const [userError, existingUser] = await to(User.findOne({githubId: profile.id}));

            if (userError) {
              logger.error(configConstants.labels.githubPassportStrategy.findingUser.error, userError);
              return done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }

            if (existingUser) {
              logger.info(configConstants.labels.githubPassportStrategy.findingUser.found, existingUser);
              return done(null, existingUser, {message: globalConstants.responseMessages.logInUser.success});
            };

            const newUser = new User({
              githubId: profile?.id,
              displayName: profile?.displayName,
              profilePicture: profile?.photos[0]?.value,
              email: profile?.id + '@email.com',
            });

            const [newUserSavedError, newUserSaved] = await to(newUser.save());

            if (newUserSavedError) {
              logger.error(configConstants.labels.githubPassportStrategy.savingNewUser.error, newUserSavedError);
              done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }

            if (newUserSaved) {
              logger.error(configConstants.labels.githubPassportStrategy.savingNewUser.success, newUserSaved);
              done(null, newUser, {message: globalConstants.responseMessages.logInUser.success});
            } else {
              logger.error(configConstants.labels.githubPassportStrategy.savingNewUser.failure, newUserSaved);
              done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }
          },
      ),
  );
};

module.exports = passportGithubConfig;
