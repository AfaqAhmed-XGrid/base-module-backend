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

// constant imports
const constants = require('./practice.constant');

/**
 * Sends welcome message on request
 * @param {Object} req
 * @param {Object} res
 */
const printMessage = async (req, res) => {
  res.status(200);
  res.json({ success: 1, message: constants.WELCOME_MSG, data: {} });
};

/**
 * Sends html tag with welcome message on request
 * @param {Object} req
 * @param {Object} res
 */
const createHTML = async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200);
  res.json({ success: 1, message: constants.WELCOME_TAG, data: {} });
};

/**
 * Gets name of request body and say hi to him
 * @param {Object} req
 * @param {Object} res
 */
const printName = async (req, res) => {
  res.status(200);
  res.json({ success: 1, message: `Hello ${req.body.name}`, data: { name } });
};

module.exports = { printMessage, createHTML, printName };
