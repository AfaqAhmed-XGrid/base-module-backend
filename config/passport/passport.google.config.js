// Package imports
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const to = require('await-to-js').default;

// Constant imports
const globalConstants = require('../../constants/constants');
const configConstants = require('../constants');

// Model imports
const User = require('../../modules/auth/auth.model');

// Logger import
const logger = require('../logger/logger');

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
            if (!profile.id) {
              logger.error(configConstants.labels.googlePassportStrategy.googleProfile.failure, profile);
              return done(null, false, {message: globalConstants.responseMessages.logInUser.socialLogin.networkError});
            }

            const [existingUserError, existingUser] = await to(User.findOne({googleId: profile.id}));

            if (existingUserError) {
              logger.error(configConstants.labels.googlePassportStrategy.findingUser.error, existingUserError);
              done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }

            if (existingUser) {
              logger.info(configConstants.labels.googlePassportStrategy.findingUser.found, existingUser);
              return done(null, existingUser, {message: globalConstants.responseMessages.logInUser.success});
            }

            const newUser = new User({
              googleId: profile?.id,
              displayName: profile?.displayName,
              profilePicture: profile?.photos[0]?.value,
              email: profile?.id + '@email.com',
            });
            const [newUserSavedError, newUserSaved] = await to(newUser.save());

            if (newUserSavedError) {
              logger.error(configConstants.labels.googlePassportStrategy.savingNewUser.error, newUserSavedError);
              done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }

            if (newUserSaved) {
              logger.error(configConstants.labels.googlePassportStrategy.savingNewUser.success, newUserSaved);
              done(null, newUser, {message: globalConstants.responseMessages.logInUser.success});
            } else {
              logger.error(configConstants.labels.googlePassportStrategy.savingNewUser.failure, newUserSaved);
              done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
            }
          },
      ),
  );
};

module.exports = passportGoogleConfig;
