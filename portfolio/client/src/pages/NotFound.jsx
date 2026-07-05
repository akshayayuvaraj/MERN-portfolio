import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          <HiArrowLeft size={18} />
          Back to Portfolio
        </Link>
      </motion.div>
    </div>
  )
}