//constant imports
const constants = require("./practice.constant");

const printMessage = (req, res) => {
    res.status(200);
    res.json({sucess: 1, message: constants.WELCOME_MSG, data:{}})
}

const createHTML = (req, res) => {
    res.set('Content-Type', 'text/html')
    res.json({sucess: 1, message: constants.WELCOME_TAG, data:{}})
}

const printName = (req, res) => {
    const {name} = req.body
    res.json({sucess: 1, message: `Hello ${name}`, data:{name}})
}

module.exports = {printMessage, createHTML, printName}