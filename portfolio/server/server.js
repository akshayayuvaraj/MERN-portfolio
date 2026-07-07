require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const path = require('path')

const connectDB = require('./config/db')
const contactRoutes = require('./routes/contactRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const errorHandler = require('./middleware/errorHandler')
const trackVisitor = require('./middleware/trackVisitor')

// Connect to MongoDB
connectDB()

const app = express()

// Trust proxy (needed for rate limiting behind Render/Vercel)
app.set('trust proxy', 1)

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// CORS - Updated to authorize your real live production domain
// CORS - Updated to authorize your real live production domain
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'https://akshaya-portfolio.vercel.app',
    'https://akshaya-mernportfolio.vercel.app' // ADD THIS LINE
  ],
  credentials: true,
}))
// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Sanitize data (prevent NoSQL injection)
app.use(mongoSanitize())

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})
app.use('/api', globalLimiter)

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/contact', contactRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Root welcome path (avoids confusing 404s when testing the baseline Render link)
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Portfolio API Backend is operating normally.' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

// Global process boundary protection to swallow unhandled background operation timeouts
process.on('unhandledRejection', (err) => {
  if (err && err.message && err.message.includes('buffering timed out')) {
    console.error('⚠️ Background DB operation timed out while buffering. Keeping server alive...');
  } else {
    console.error('💥 Unhandled Rejection:', err);
  }
});