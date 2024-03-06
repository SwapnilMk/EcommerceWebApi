const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/database');

const port = process.env.PORT || 3000;  

// Connect to the database
connectDB();



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})