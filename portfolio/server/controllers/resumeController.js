const path = require('path')
const fs = require('fs')
const Resume = require('../models/Resume')

/**
 * GET /api/resume/download
 * Track and serve resume PDF
 */
const downloadResume = async (req, res, next) => {
  try {
    const resumePath = path.join(__dirname, '../uploads/resume.pdf')

    // 1. Check if the file exists first
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    // 2. Attempt to track the download in the background (Non-blocking)
    try {
      await Resume.findOneAndUpdate(
        {},
        {
          $inc: { downloadCount: 1 },
          $set: { lastDownloadAt: new Date() },
          $push: {
            downloads: {
              ip: req.ip,
              userAgent: req.headers['user-agent'],
            },
          },
        },
        { 
          upsert: true, 
          new: true,
          serverSelectionTimeoutMS: 2000 // Don't let Mongoose hang for 10+ seconds if DB is down
        }
      )
    } catch (dbError) {
      // Log the database error quietly so you can fix it, but don't stop the user
      console.error('[Background Error] Failed to log resume download to MongoDB:', dbError.message)
    }

    // 3. Send the file immediately 
    res.setHeader('Content-Disposition', 'attachment; filename="Akshaya_Y_Resume.pdf"')
    res.setHeader('Content-Type', 'application/pdf')
    res.sendFile(resumePath)

  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/resume/count
 * Get total download count
 */
const getDownloadCount = async (req, res, next) => {
  try {
    const record = await Resume.findOne({}).maxTimeMS(2000) // Fast fail if DB hangs
    res.json({
      success: true,
      data: { count: record?.downloadCount || 0 },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { downloadResume, getDownloadCount }