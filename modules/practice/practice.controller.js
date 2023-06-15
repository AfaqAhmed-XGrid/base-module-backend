//constant imports
const constants = require("./practice.constant");

// sends welcome message on request
const printMessage = async (req, res) => {
  res.status(200);
  res.json({ success: 1, message: constants.WELCOME_MSG, data: {} });
};

// sends html tag with welcome message on request
const createHTML = async (req, res) => {
  res.set("Content-Type", "text/html");
  res.json({ success: 1, message: constants.WELCOME_TAG, data: {} });
};

// gets name of request body and say hi to him
const printName = async (req, res) => {
  res.json({ success: 1, message: `Hello ${req.body.name}`, data: { name } });
};

module.exports = { printMessage, createHTML, printName };
