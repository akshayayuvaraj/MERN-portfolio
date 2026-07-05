const jwt = require('jsonwebtoken')
const Contact = require('../models/Contact')
const Resume = require('../models/Resume')
const Visitor = require('../models/Visitor')

/**
 * POST /api/admin/login
 * Authenticate admin and return JWT
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    // Compare against env variables
    const isValidUsername = username === process.env.ADMIN_USERNAME
    const isValidPassword = password === process.env.ADMIN_PASSWORD

    if (!isValidUsername || !isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({ success: true, token, message: 'Login successful' })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/admin/messages
 * Get all contact messages (admin only)
 */
const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).lean()
    res.json({ success: true, data: messages })
  } catch (error) {
    next(error)
  }
}

/**
 * DELETE /api/admin/messages/:id
 */
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' })
    }
    res.json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * PATCH /api/admin/messages/:id/read
 */
const markMessageRead = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' })
    }
    res.json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
const getStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const [totalMessages, unreadMessages, resumeData, todayVisitor] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Resume.findOne({}),
      Visitor.findOne({ date: today }),
    ])

    res.json({
      success: true,
      data: {
        totalMessages,
        unreadMessages,
        resumeDownloads: resumeData?.downloadCount || 0,
        todayVisits: todayVisitor?.count || 0,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { login, getMessages, deleteMessage, markMessageRead, getStats }