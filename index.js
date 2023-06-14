const express = require('express');
const app = express();
const path = require('path');

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200);
    res.json({message: 'Welcome to the root URL of the server'})
})

app.get('/hello', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send('<h1>Welcome to the hello URL of the server</h1>')
})

app.post('/api/post', (req, res) => {
    const {name} = req.body
    res.send(`Hello ${name}`)
})

app.use('/pic', express.static(path.join(__dirname, 'staticFiles')))

const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
    if(!error) {
        console.log('App is successfully running on', PORT)
    } else {
        console.log('Error occurred! Server cannot start ', error)
    }
})