const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ErrorHandler = require('./middlewares/Error')

const app = express()
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDb is connected')
    }).catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('server is running on port 3000');
})

app.use(ErrorHandler)