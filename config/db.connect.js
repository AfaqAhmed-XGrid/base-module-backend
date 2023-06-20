// package imports
const mongoose = require('mongoose');

// Constant imports
const constants = require('./config.constants');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(constants.DB_CONNECTED_MSG);
  } catch (error) {
    console.log(constants.DB_NOT_CONNECTED_MSG + error);
  }
};

module.exports = dbConnect;
