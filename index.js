// package imports
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();

// const imports
const dbConnect = require('./config/db.connect');
const practiceRouter = require('./modules/practice/practice.route');
const authRouter = require('./modules/auth/auth.route');
const passportLocalConfigure = require('./config/passport.local.config');
const passportGoogleConfig = require('./config/passport.google.config');
const passportGithubConfig = require('./config/passport.github.config');
const constants = require('./constants/constants');

// creating instance
const app = express();

// Connecting database
dbConnect();

// Adding middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
);
app.use(
    session({
      secret: process.env.SESSION_CODE,
      resave: true,
      saveUninitialized: true,
    }),
);
app.use(cookieParser(process.env.SESSION_CODE));
app.use(passport.initialize());
app.use(passport.session());
passportLocalConfigure(passport);
passportGoogleConfig(passport);
passportGithubConfig(passport);

// Configuring Routes
app.use('/api/practice/', practiceRouter);
app.use('/api/auth/', authRouter);

// Starting the application on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(constants.RUNNING_APP_MSG, PORT);
  } else {
    console.log(constants.FAILED_RUNNING_APP_MSG, error);
  }
});
