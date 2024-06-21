require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

// CORS Configuration  
app.use(cors({
    origin: 'https://chatgenius.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(cookieParser())
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
app.use(express.json())

// Connect routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/openai', require('./routes/openai.js'))
app.use('/api/stripe', require('./routes/stripe.js'))
app.use(errorHandler)

app.listen(port, () => { console.log(`Server is running on port: ${port}`)})