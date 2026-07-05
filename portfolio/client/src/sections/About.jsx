import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, slideLeft, staggerContainer } from '../animations/variants'
import { HiAcademicCap, HiCode, HiLightBulb, HiHeart } from 'react-icons/hi'

const cards = [
  {
    icon: HiAcademicCap,
    title: 'Background',
    description:
      'B.Tech Agricultural Engineering student . Discovered my love for software through self-learning — built my first React app in 2026',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: HiCode,
    title: 'What I Build',
    description:
      'Full-stack web apps using the MERN stack. I care deeply about clean code, performance, and developer experience.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: HiLightBulb,
    title: 'Problem Solver',
    description:
      'DSA enthusiast who practices daily on LeetCode. I believe strong fundamentals make better engineers.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: HiHeart,
    title: 'Why Software',
    description:
      'Software compounds. One product can reach millions. I want to build tools that make people\'s lives genuinely easier.',
    color: 'from-pink-500 to-rose-600',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-gray-50 dark:bg-[#0f172a]/50">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              About Me
            </span>
            <h2 className="section-title mt-2">
              The person behind the code
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              An unconventional path into software — and why I wouldn't have it any other way.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: story */}
            <motion.div
              variants={slideLeft}
              className="lg:col-span-2 space-y-5"
            >
              <div className="card p-8 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I'm Akshaya Y, a B.Tech Agricultural Engineering student who fell in love with code.
                  What started as curiosity turned into a serious pursuit: I've spent the past one years
                  building real projects, solving DSA problems, and learning the craft of software engineering.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  My goal is to join as a Software Development Engineer — not just for the role,
                  but because I want to work on systems that operate at global scale and real-world complexity.
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Stat number="60+" label="LeetCode Problems" />
                    <Stat number="5+" label="Projects Built" />
                    <Stat number="10+" label="Certifications" />
                    <Stat number="1+" label="Years Coding" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: cards */}
            <motion.div
              variants={staggerContainer}
              className="lg:col-span-3 grid sm:grid-cols-2 gap-4"
            >
              {cards.map((card) => (
                <motion.div key={card.title} variants={fadeUp}>
                  <div className="card p-6 h-full hover:shadow-md transition-shadow group">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <card.icon className="text-white" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ number, label }) {
  return (
    <div>
      <p className="text-2xl font-bold gradient-text">{number}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}