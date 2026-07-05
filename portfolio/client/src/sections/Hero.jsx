import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiDownload, HiArrowRight } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { fadeUp, slideRight, staggerContainer } from '../animations/variants'
import { downloadResume } from '../services/api'
import photo from "../assets/akshaya.jpeg"; // Ensure extension matches your file system

const titles = [
  'MERN Stack Developer',
  'Java Developer',
  'DSA Enthusiast',
  'Aspiring SDE',
]

function RotatingTitle({ titles }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % titles.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [titles])

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 font-mono"
      >
        {'> '}{titles[index]}
      </motion.p>
    </AnimatePresence>
  )
}

function FloatingBadge({ top, bottom, left, right, icon, text, delay }) {
  return (
    <motion.div
      className={`absolute ${top || ''} ${bottom || ''} ${left || ''} ${right || ''} z-20`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <div className="card px-3 py-2 flex items-center gap-2 shadow-lg bg-white/90 dark:bg-[#161b2e]/90 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{text}</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const handleResumeDownload = async () => {
    // Dynamically retrieve your backend base URL from Vite's env variables
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    try {
      const response = await downloadResume()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Akshaya_Y_Resume.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      // Corrected fallback to open directly from the backend server port instead of frontend port
      window.open(`${apiBaseUrl}/resume/download`, '_blank')
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-white dark:bg-[#0a0e1a] relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161b2e_1px,transparent_1px),linear-gradient(to_bottom,#161b2e_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

      {/* Main Container - Matches the wider look */}
      <div className="w-full max-w-[1350px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Akshaya Y</span>
              </h1>
            </motion.div>

            {/* Rotating title */}
            <motion.div variants={fadeUp} className="h-8">
              <RotatingTitle titles={titles} />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg"
            >
              I’m a full-stack developer who builds modern web applications using React,
              Node.js, and Java. I enjoy solving problems through code and continuously 
              improving my skills in algorithms and system building.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button onClick={handleResumeDownload} className="btn-primary flex items-center gap-2">
                <HiDownload size={18} />
                Download Resume
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary flex items-center gap-2"
              >
                Get in Touch
                <HiArrowRight size={16} />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://github.com/akshaya-y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://linkedin.com/in/akshaya-y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <FaLinkedin size={22} />
              </a>
              <span className="text-gray-200 dark:text-gray-700 hidden sm:inline">|</span>
              <span className="text-sm text-gray-400 font-mono">
                ibmakshaya@gmail.com
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-sky-500/30 blur-3xl scale-110" />

              {/* Avatar Wrapping Container */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-72 h-72 sm:w-80 sm:h-80"
              >
                {/* Gradient ring frame */}
                <div className="w-full h-full rounded-full p-[5px] bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-400 shadow-2xl shadow-indigo-500/30">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0e1a] p-[5px] flex items-center justify-center overflow-hidden">
                    <img
                      src={photo}
                      alt="Akshaya Y"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                      }}
                    />
                    {/* Fallback frame */}
                    <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-xl">
                          <span className="text-white font-bold text-3xl">A</span>
                        </div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-mono px-4">
                          Image Error
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <FloatingBadge top="-top-4" right="-right-4" icon="💻" text="Full Stack" delay={0} />
                <FloatingBadge bottom="-bottom-4" left="-left-4" icon="☕" text="Java" delay={0.5} />
                <FloatingBadge top="top-1/2" right="-right-8" icon="🧠" text="DSA" delay={1} />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
        </div>
      </motion.div>
    </section>
  )
}