require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

// Connect database
try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB!")
} catch (err) {
    console.log(err)
}

const port = process.env.PORT || 4242

app.listen(port, () => { console.log(`Server is running on port: ${port}`)})