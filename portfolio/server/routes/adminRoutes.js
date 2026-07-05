const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {
  login,
  getMessages,
  deleteMessage,
  markMessageRead,
  getStats,
} = require('../controllers/adminController')

// Public
router.post('/login', login)

// Protected — all routes below require JWT
router.use(authMiddleware)

router.get('/messages', getMessages)
router.delete('/messages/:id', deleteMessage)
router.patch('/messages/:id/read', markMessageRead)
router.get('/stats', getStats)

module.exports = router