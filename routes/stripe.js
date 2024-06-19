const express = require('express')
const { protect } = require('../middleware/auth')
const router = express.Router()

const { createCheckout } = require('../controllers/stripe')

router.post('/checkout', protect, createCheckout)

module.exports = router