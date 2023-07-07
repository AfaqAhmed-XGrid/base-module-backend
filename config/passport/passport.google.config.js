// Package imports
const env = require('dotenv').config();
const to = require('await-to-js').default;
const { PassportStatic } = require('passport');

// Passport Strategy import
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Constant imports
const responseMsgs = require('../../constants/constants').responseMessages;

// Model imports
const User = require('../../modules/auth/auth.model');

// Logger import
const logger = require('../logger/logger');

/**
 * Defining passport google strategy
 * @param {PassportStatic} passport
 */
const passportGoogleConfig = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }).then((user) => cb(null, user));
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
            logger.info('Started authenticating user through google (Google Strategy)');

            if (!profile.id) {
              logger.error('No id is found in profile (Google Strategy)', { profile: profile });
              return done(null, false, { message: responseMsgs.logInUser.socialLogin.failure });
            }

            const [existingUserError, existingUser] = await to(User.findOne({ googleId: profile.id }));

            if (existingUserError) {
              logger.error('Error in finding if user is alreadty in db (Google Strategy)', { error: existingUserError });
              done(null, false, { message: responseMsgs.logInUser.failure });
            } else if (existingUser) {
              logger.info('User is already existed in db (Google Strategy)', { userId: existingUser._id });
              return done(null, existingUser, { message: responseMsgs.logInUser.success });
            }

            const newUser = new User({
              googleId: profile?.id,
              displayName: profile?.displayName,
              profilePicture: profile?.photos[0]?.value,
            });
            const [newUserSavedError, newUserSaved] = await to(newUser.save());

            if (newUserSavedError) {
              logger.error('Error in saving new user to db (Google Strategy)', { error: newUserSavedError });
              done(null, false, { message: responseMsgs.logInUser.failure });
            } else if (newUserSaved) {
              logger.info('New user is saved in db (Google Strategy)', { userId: newUserSaved._id });
              done(null, newUser, { message: responseMsgs.logInUser.success });
            } else {
              logger.error('No user no error was return while saving user in db (Google Strategy)', { user: newUserSaved });
              done(null, false, { message: responseMsgs.logInUser.failure });
            }
          },
      ),
  );
};

module.exports = passportGoogleConfig;
