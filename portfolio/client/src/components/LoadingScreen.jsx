import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 4
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0f172a]"
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white font-bold text-2xl font-mono">A</span>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold tracking-widest text-gray-900 dark:text-white font-mono uppercase"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AKSHAYA
          </motion.h1>
          <motion.p
            className="text-sm text-gray-400 dark:text-gray-500 tracking-widest mt-1 font-mono uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Portfolio
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-0.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.p
          className="mt-3 text-xs text-gray-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {progress}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}