// Package imports
const localStrategy = require('passport-local').Strategy;
const to = require('await-to-js').default;

// Constant imports
const globalConstants = require('../../constants/constants');
const configConstants = require('../constants');

// Model imports
const User = require('../../modules/auth/auth.model');

// Logger import
const logger = require('../logger/logger');

const passportLocalConfigure = (passport) => {
  passport.use(
      'login',
      new localStrategy({usernameField: 'email'}, async function(
          email,
          password,
          done,
      ) {
        const [err, user] = await to(User.findOne({email}));

        if (err) {
          logger.error(configConstants.labels.localPassportStrategy.login.findingUser.error, err);
          return done(null, false, {message: globalConstants.responseMessages.logInUser.failure});
        }

        if (user) {
          if ((await user.isPasswordMatched(password))) {
            return done(null, user, {message: globalConstants.responseMessages.logInUser.success});
          } else {
            return done(null, false, {message: globalConstants.responseMessages.logInUser.wrongCredentails});
          }
        } else {
          return done(null, false, {message: globalConstants.responseMessages.logInUser.wrongCredentails});
        }
      }),
  );

  passport.use(
      'signup',
      new localStrategy(
          {passReqToCallback: true, usernameField: 'email'},
          async function(req, email, password, done) {
            const [err, user] = await to(User.findOne({email}));

            if (err) {
              logger.error(configConstants.labels.localPassportStrategy.signup.findingUser.error, err);
              return done(null, false, {message: globalConstants.responseMessages.signUpUser.failure});
            }

            if (user) {
              return done(null, user, {message: globalConstants.responseMessages.signUpUser.userAlreadyExisted});
            }

            if (!user) {
              const newUser = new User(req.body);
              const [newUserSavingError, newUserSaved] = await to(newUser.save());

              if (newUserSavingError) {
                logger.error(configConstants.labels.localPassportStrategy.signup.savingNewUser.error, newUserSavingError);
                return done(null, false, {message: globalConstants.responseMessages.signUpUser.failure});
              };

              if (newUserSaved) {
                logger.error(configConstants.labels.localPassportStrategy.signup.savingNewUser.success, newUserSavingError);
                return done(null, newUser, {
                  message: globalConstants.responseMessages.signUpUser.success,
                });
              } else {
                logger.error(configConstants.labels.localPassportStrategy.signup.savingNewUser.failure, newUserSavingError);
                return done(null, false, {message: globalConstants.responseMessages.signUpUser.failure});
              }
            }
          },
      ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}).then((user) => cb(null, user));
  });
};

module.exports = passportLocalConfigure;
