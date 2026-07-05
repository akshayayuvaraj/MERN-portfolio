const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema(
  {
    downloadCount: {
      type: Number,
      default: 0,
    },
    lastDownloadAt: {
      type: Date,
    },
    downloads: [
      {
        ip: String,
        userAgent: String,
        downloadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Resume', resumeSchema)