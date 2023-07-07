// Package imports
const to = require('await-to-js').default;
const { PassportStatic } = require('passport');

// Passport Strategy import
const localStrategy = require('passport-local').Strategy;

// Constant imports
const responseMsgs = require('../../constants/constants').responseMessages;

// Model imports
const User = require('../../modules/auth/auth.model');

// Logger import
const logger = require('../logger/logger');

/**
 * Defining passport local strategy
 * @param {PassportStatic} passport
 */
const passportLocalConfigure = (passport) => {
  passport.use(
      'login',
      new localStrategy({ usernameField: 'email' }, async function(
          email,
          password,
          done,
      ) {
        logger.info('Started login strategy (loginStrategy)');

        const [err, user] = await to(User.findOne({ email }));

        if (err) {
          logger.error('Error in finding user in db (loginStrategy)', { error: err });
          return done(null, false, { message: responseMsgs.logInUser.failure });
        } else if (user) {
          logger.info('Found user in db (loginStrategy)', { userId: user._id });
          if ((await user.isPasswordMatched(password))) {
            logger.info('Password is matched (loginStrategy)', { userId: user._id });
            return done(null, user, { message: responseMsgs.logInUser.success });
          } else {
            logger.info('Password does not match (loginStrategy)', { userId: user._id });
            return done(null, false, { message: responseMsgs.logInUser.wrongCredentails });
          }
        } else {
          logger.info('No user Found in db (loginStrategy)');
          return done(null, false, { message: responseMsgs.logInUser.wrongCredentails });
        }
      }),
  );

  passport.use(
      'signup',
      new localStrategy(
          { passReqToCallback: true, usernameField: 'email' },
          async function(req, email, password, done) {
            logger.info('Started signup strategy (signupStrategy)');

            const [err, user] = await to(User.findOne({ email }));

            if (err) {
              logger.error('Error in finding user in db (signupStrategy)', { error: err });
              return done(null, false, { message: responseMsgs.signUpUser.failure });
            } else if (user) {
              logger.info('User is already in db (signupStrategy)', { userId: user._id });
              return done(null, user, { message: responseMsgs.signUpUser.userAlreadyExisted });
            } else if (!user) {
              const newUser = new User(req.body);
              const [newUserSavingError, newUserSaved] = await to(newUser.save());

              if (newUserSavingError) {
                logger.error('Error in saving new user to db', { error: newUserSavingError });
                return done(null, false, { message: responseMsgs.signUpUser.failure });
              } else if (newUserSaved) {
                logger.log('New user is saved in db successfully', { userId: newUserSaved._id });
                return done(null, newUser, { message: responseMsgs.signUpUser.success });
              } else {
                logger.error('No error or user is return while saving new user in db', { user: newUserSaved, error: newUserSavingError });
                return done(null, false, { message: responseMsgs.signUpUser.failure });
              }
            }
          },
      ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }).then((user) => cb(null, user));
  });
};

module.exports = passportLocalConfigure;
