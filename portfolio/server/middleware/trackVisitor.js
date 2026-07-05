const Visitor = require('../models/Visitor')

/**
 * trackVisitor middleware
 * Increments a daily visitor counter in MongoDB.
 * Attach to any public route you want to count.
 *
 * Usage in server.js:
 *   const trackVisitor = require('./middleware/trackVisitor')
 *   app.use('/api/resume/download', trackVisitor)
 */
const trackVisitor = async (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
    await Visitor.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true }
    )
  } catch (err) {
    // Non-critical — log and move on
    console.error('Visitor tracking error:', err.message)
  }
  next()
}

module.exports = trackVisitor