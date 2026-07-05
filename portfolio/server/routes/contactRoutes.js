const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const { submitContact } = require('../controllers/contactController')

// Rate limit: max 5 messages per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent. Please wait 15 minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Validation rules
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  body('subject').optional().trim().isLength({ max: 200 }),
]

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    })
  }
  next()
}

// POST Route
router.post('/', contactLimiter, validateContact, handleValidationErrors, submitContact)

module.exports = router