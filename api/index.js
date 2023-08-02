/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// package imports
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

// COnfig imports
const dbConnect = require('./config/db.connect');
const passportLocalConfigure = require('./config/passport/passport.local.config');
const passportGoogleConfig = require('./config/passport/passport.google.config');
const passportGithubConfig = require('./config/passport/passport.github.config');

// Routes import
const authRouter = require('./modules/auth/auth.route');
const movieRouter = require('./modules/movie/movie.route');

// Logger imports
const logger = require('./config/logger/logger');

// Swagger document import
const swaggerDocument = require('./swagger.json');

// Seed movies function import
const seedMovies = require('./modules/movie/movie.seed');

// creating instance
const app = express();

// Connecting database
dbConnect();

// Adding middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  next();
});
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
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
);

// Configuring Routes
app.use('/api/auth/', authRouter);
app.use('/api/movie/', movieRouter);

// Uplaoding movies data to db
seedMovies();

// Starting the application on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
  if (!error) {
    logger.info('App is successfully running on', { PORT: PORT });
  } else {
    logger.error('Error occured! Server cannot start', error);
  }
});
