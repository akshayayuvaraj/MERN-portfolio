import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp } from '../animations/variants'

const GAME_DURATION = 30

export default function FunZone() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fun-zone" className="bg-gray-50 dark:bg-[#0a1628]">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Fun Zone
            </span>
            <h2 className="section-title mt-2">Catch The Star ⭐</h2>
            <p className="section-subtitle max-w-md mx-auto">
              Click the stars before they disappear. You have 30 seconds. How fast are you?
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <StarGame />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StarGame() {
  const [gameState, setGameState] = useState('idle') // idle | playing | ended
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [stars, setStars] = useState([])
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('starHighScore') || '0'))
  const [missed, setMissed] = useState(0)
  const timerRef = useRef(null)
  const starRef = useRef(null)

  const spawnStar = useCallback(() => {
    const id = Date.now() + Math.random()
    const x = 5 + Math.random() * 85
    const y = 5 + Math.random() * 85
    const size = 28 + Math.random() * 20
    const duration = 800 + Math.random() * 1000

    setStars(prev => [...prev, { id, x, y, size }])

    setTimeout(() => {
      setStars(prev => {
        const exists = prev.find(s => s.id === id)
        if (exists) setMissed(m => m + 1)
        return prev.filter(s => s.id !== id)
      })
    }, duration)
  }, [])

  const startGame = () => {
    setScore(0)
    setMissed(0)
    setTimeLeft(GAME_DURATION)
    setStars([])
    setGameState('playing')
  }

  useEffect(() => {
    if (gameState !== 'playing') return

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setGameState('ended')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [gameState])

  useEffect(() => {
    if (gameState !== 'playing') return

    // Spawn stars at increasing frequency
    const interval = setInterval(spawnStar, 600)
    return () => clearInterval(interval)
  }, [gameState, spawnStar])

  useEffect(() => {
    if (gameState === 'ended') {
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem('starHighScore', score.toString())
      }
    }
  }, [gameState, score, highScore])

  const clickStar = (id, e) => {
    e.stopPropagation()
    setStars(prev => prev.filter(s => s.id !== id))
    setScore(prev => prev + 1)
  }

  const timerColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-yellow-500' : 'text-green-500'

  return (
    <div className="w-full max-w-2xl">
      {/* Score Bar */}
      <div className="card p-4 mb-4 flex items-center justify-between">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
          <p className="text-xs text-gray-400">Score</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold font-mono ${timerColor}`}>{timeLeft}s</p>
          <p className="text-xs text-gray-400">Time Left</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{highScore}</p>
          <p className="text-xs text-gray-400">Best</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-400">{missed}</p>
          <p className="text-xs text-gray-400">Missed</p>
        </div>
      </div>

      {/* Game Arena */}
      <div
        className="card relative overflow-hidden cursor-crosshair select-none"
        style={{ height: '380px' }}
        onClick={() => gameState === 'playing' && setMissed(m => m)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 dark:from-gray-900 dark:via-[#0d1b2e] dark:to-purple-950">
          {/* Stars bg */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Game state overlays */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <h3 className="text-white text-xl font-bold mb-2">Catch The Star</h3>
            <p className="text-gray-300 text-sm mb-6 text-center px-8">
              Stars will appear randomly. Click them before they disappear!
            </p>
            <button onClick={startGame} className="btn-primary">
              Start Game
            </button>
          </div>
        )}

        {gameState === 'ended' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/70 backdrop-blur-sm"
          >
            <div className="text-5xl mb-4">{score >= 20 ? '🏆' : score >= 10 ? '🎯' : '⭐'}</div>
            <h3 className="text-white text-2xl font-bold mb-1">Game Over!</h3>
            <p className="text-gray-300 mb-1">Final Score: <span className="text-yellow-400 font-bold">{score}</span></p>
            <p className="text-gray-400 text-sm mb-1">Missed: {missed}</p>
            {score >= highScore && score > 0 && (
              <p className="text-green-400 text-sm font-medium mb-4">🎉 New High Score!</p>
            )}
            <div className="flex gap-3 mt-4">
              <button onClick={startGame} className="btn-primary">
                Play Again
              </button>
              <button
                onClick={() => setGameState('idle')}
                className="btn-secondary text-white border-gray-600"
              >
                Menu
              </button>
            </div>
          </motion.div>
        )}

        {/* Stars */}
        <AnimatePresence>
          {stars.map((star) => (
            <motion.button
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute cursor-pointer hover:scale-125 transition-transform focus:outline-none"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                fontSize: `${star.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => clickStar(star.id, e)}
              aria-label="Catch the star"
            >
              ⭐
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Timer bar */}
        {gameState === 'playing' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>
    </div>
  )
}