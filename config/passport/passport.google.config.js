// Package imports
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const to = require('await-to-js').default;

// Constant imports
const constants = require('../../constants/constants');
const googleConstants = require('../constants');

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
              logger.error(googleConstants.labels.googlePassportStrategy.googleProfile.failure, profile);
              return done(null, false, {message: constants.responseMessages.logInUser.socialLogin.networkError});
            }

            const [existingUserError, existingUser] = await to(User.findOne({googleId: profile.id}));

            if (existingUserError) {
              logger.error(googleConstants.labels.googlePassportStrategy.findingUser.failure, existingUserError);
              done(null, false, {message: constants.responseMessages.logInUser.failure});
            }

            // If user is already existed in database, just log it in without saving it in db
            if (existingUser) {
              logger.info(googleConstants.labels.googlePassportStrategy.findingUser.found, existingUser);
              return done(null, existingUser, {message: constants.responseMessages.logInUser.success});
            }

            const newUser = new User({
              googleId: profile?.id,
              displayName: profile?.displayName,
              profilePicture: profile?.photos[0]?.value,
              email: profile?.id + '@email.com',
            });
            const [newUserSavedError, newUserSaved] = await to(newUser.save());

            if (newUserSavedError) {
              logger.error(googleConstants.labels.googlePassportStrategy.savingNewUser.failure, newUserSavedError);
              done(null, false, {message: constants.responseMessages.logInUser.failure});
            }

            if (newUserSaved) {
              logger.error(googleConstants.labels.googlePassportStrategy.savingNewUser.success, newUserSaved);
              done(null, newUser, {message: constants.responseMessages.logInUser.success});
            } else {
              logger.error(googleConstants.labels.googlePassportStrategy.savingNewUser.failure, newUserSaved);
              done(null, false, {message: constants.responseMessages.logInUser.failure});
            }
          },
      ),
  );
};

module.exports = passportGoogleConfig;
