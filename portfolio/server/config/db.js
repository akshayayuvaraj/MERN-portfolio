const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    console.log('🚀 Local server is keeping alive for static asset/resume delivery...')
    
    // Commented out or removed so it does not kill your server
    // process.exit(1) 
  }
}

module.exports = connectDB