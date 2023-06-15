//Package Imports
const express  =require("express");
const path = require("path");

//const imports
const { printMessage, createHTML, printName } = require("./practice.controller");

//Creating instances
const router = express.Router();

router.get('/', printMessage)

router.get('/hello', createHTML)

router.post('/api/post', printName)

router.use('/pic', express.static(path.join(__dirname, 'assets')))

module.exports = router;