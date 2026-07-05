import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '../animations/variants'
import { HiAcademicCap, HiBriefcase, HiBadgeCheck, HiStar } from 'react-icons/hi'

const timeline = [
  {
    type: 'education',
    icon: HiAcademicCap,
    year: '2026 – Present',
    title: 'B.Tech Agricultural Engineering',
    organization: 'ESEC',
    description:
      'Studying core subjects while actively self-studying computer science, data structures, and full-stack development.',
    color: 'from-blue-500 to-blue-600',
    tags: ['GPA: 8.9/10'],
  },
  {
    type: 'achievement',
    icon: HiStar,
    year: '2026-Present',
    title: 'Full Stack Web Development',
    organization: 'Self-Directed Learning',
    description:
      'Built 5+ production-grade projects using the MERN stack. Focused on software architecture, API design, and deployment.',
    color: 'from-purple-500 to-purple-600',
    tags: ['React', 'Node.js', 'MongoDB','Express JS'],
  },
  {
    type: 'certification',
    icon: HiBadgeCheck,
    year: '2026',
    title: 'Java Programming — Intermediate',
    organization: 'Leetcode',
    description:
      'Intermediate in core Java concepts including OOP, data structures, exception handling, and collections.',
    color: 'from-cyan-500 to-cyan-600',
    tags: ['Java', 'OOP', 'DSA'],
  },
  {
    type: 'certification',
    icon: HiBadgeCheck,
    year: '2026',
    title: 'Introduction to Full Stack Developement',
    organization: 'Novitech',
    description:
      'Completed an intensive 30-day Full Stack Development Masterclass at Noitech, gaining hands-on experience in building modern web applications.',
    color: 'from-green-500 to-emerald-600',
    tags: ['MongoDB', 'NoSQL'],
  },
  {
    type: 'achievement',
    icon: HiStar,
    year: '2026 – Present',
    title: 'LeetCode Problem Solver',
    organization: 'LeetCode',
    description:
      'Consistently solving DSA problems in Java. Focus on arrays, strings, trees, and dynamic programming.',
    color: 'from-orange-500 to-amber-600',
    tags: ['60+ Problems', 'Java', 'DSA'],
  },
  {
    type: 'education',
    icon: HiAcademicCap,
    year: '2022 – 2024',
    title: 'Higher Secondary Education',
    organization: 'State Board, Tamil Nadu',
    description:
      'Completed 12th with strong performance in Mathematics, Biology, and Physics.',
    color: 'from-indigo-500 to-blue-600',
    tags: ['Score: 85%'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="bg-white dark:bg-[#0f172a]">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Journey
            </span>
            <h2 className="section-title mt-2">Experience & Education</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Every step that shaped who I am as a developer.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-cyan-200 dark:from-blue-800 dark:via-purple-800 dark:to-cyan-800" />

            <div className="space-y-10">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <item.icon className="text-white" size={18} />
                    </div>
                  </div>

                  {/* Card — positioned on alternating sides */}
                  <div
                    className={`card p-6 ml-16 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                          {item.year}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                          {item.organization}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}