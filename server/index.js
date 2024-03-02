const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const upload = require('./Routes/upload')
const cors = require('cors')
const ErrorHandler = require('./middlewares/Error')

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use("/uploads", express.static("uploads"))
app.use('/api/file', upload)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDb is connected')
    }).catch((err) => {
        console.log(err)
    })

app.listen(7000, () => {
    console.log('server is running on port 7000');
})

app.use(ErrorHandler)