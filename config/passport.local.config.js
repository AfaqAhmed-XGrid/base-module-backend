// Package imports
const localStrategy = require('passport-local').Strategy;

// Constant Imports
const constants = require('./config.constants');
const User = require('../modules/auth/auth.model');

const passportLocalConfigure = (passport) => {
  passport.use(
      'login',
      new localStrategy({usernameField: 'email'}, async function(
          email,
          password,
          done,
      ) {
        try {
          const user = await User.findOne({email});
          if (!user) {
            console.log('first');
            return done(null, false, {message: constants.WRONG_EMAIL_MSG});
          }

          if (!(await user.isPasswordMatched(password))) {
            return done(null, false, {message: constants.WRONG_PASS_MSG});
          }

          return done(null, user, {message: constants.LOGGED_IN_MSG});
        } catch (error) {
          console.log(constants.LOGIN_CATCH_ERROR_MSG, error);
          return done(null, false, {message: constants.FAILED_LOGGED_IN_MSG});
        }
      }),
  );

  passport.use(
      'signup',
      new localStrategy(
          {passReqToCallback: true, usernameField: 'email'},
          async function(req, email, password, done) {
            try {
              User.findOne({email})
                  .lean()
                  .then(async (user) => {
                    if (!user) {
                      const newUser = new User(req.body);
                      await newUser.save();
                      return done(null, newUser, {
                        message: constants.ACCOUNT_CREATED_MSG,
                      });
                    } else {
                      return done(null, false, {
                        message: constants.USER_EXIST_MSG,
                      });
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      console.log(err);
                      return done(null, false, {
                        message: constants.SIGN_UP_FAILED_MSG,
                      });
                    }
                  });
            } catch (error) {
              console.log(constants.SIGNUP_CATCH_ERROR_MSG, error);
              return done(null, false, {message: constants.SIGN_UP_FAILED_MSG});
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
