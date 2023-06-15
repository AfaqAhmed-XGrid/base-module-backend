// package imports
const express = require('express');
//const imports
const practiceRouter = require("./modules/practice/practice.route")

//creating instance
const app = express();

//Adding middleware
app.use(express.json())
app.use('/api/practice/', practiceRouter)

//Starting the application on port 4000
const PORT = 4000;
app.listen(PORT, (error) => {
    if(!error) {
        console.log('App is successfully running on', PORT)
    } else {
        console.log('Error occurred! Server cannot start ', error)
    }
})