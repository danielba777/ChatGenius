const express = require('express')
const router = express.Router()

const { summarize, paragraph, chatbot, jsConverter, scifi } = require('../controllers/openai')

router.post('/summary', summarize)
router.post('/paragraph', paragraph)
router.post('/chatbot', chatbot)
router.post('/js-converter', jsConverter)
router.post('/scifi-img', scifi)

module.exports = router