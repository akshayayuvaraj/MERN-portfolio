import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp, hoverLift } from '../animations/variants'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { HiCode } from 'react-icons/hi'

// ──────────────────────────────────────────────────────────────
// PROJECT IMAGES
// ──────────────────────────────────────────────────────────────
import hydroSmart from "../assets/hydrosmart.png"
import fire from "../assets/fire.png"
import study from "../assets/study.png"
import apr from "../assets/apr.png"
import job from "../assets/job.png"
import quiz from "../assets/quizz.png"
import api from "../assets/api.png"

const projects = [
  {
    id: 0,
    title: 'HydroSmart',
    description:
     'An elite, gamified hydration tracker featuring premium glassmorphic UI and live liquid physics that visually rewards users as they hit their daily water goals.',
    tags: ['HTML5 & JavaScript (ES6+)', 'Tailwind CSS', 'Custom CSS3'],
    image: hydroSmart,
    category: 'Frontend',
    github: "https://github.com/akshayayuvaraj/HydroSmart",
    demo: 'https://akshayayuvaraj.github.io/HydroSmart/',
    featured: true,
    gradient: 'from-amber-500 to-orange-600',
    isLive: true,
  },
  {
    id: 1,
    title: 'AI Electrical Fire Prevention',
    description:
      'An intelligent machine-learning system that predicts electrical fire risks by analysing voltage fluctuations, temperature sensors, and usage patterns. Uses AI algorithms to issue early warnings and prevent disasters before they happen.',
    tags: ["Python", "AI / ML", "Predictive Analysis", "Safety Tech","React"],
    image: fire,
    category: 'Frontend',
    github: 'https://akshayayuvaraj.github.io/AI-fire-prevention-system/',
    demo: 'https://github.com/akshayayuvaraj/AI-fire-prevention-system',
    featured: true,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Smart Study Planner',
    description:
      'A productivity-focused web app that helps students plan study schedules intelligently, set weekly goals, track progress, and manage time effectively with a clean, intuitive interface.',
    tags: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    image: study,
    category: 'Frontendk',
    github: 'https://github.com/akshayayuvaraj/Smart-Study-plannar',
    demo: 'https://akshayayuvaraj.github.io/Smart-Study-plannar/',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 3,
    title: 'APR Garments',
    description:
      'APR Garments is a responsive clothing website designed to showcase products with a clean, modern, and user-friendly interface for an enhanced shopping experience.',
    tags: ['React', 'Tailwind CSS', 'Redux'],
    image: apr,
    category: 'Frontend',
    github: 'https://akshayayuvaraj.github.io/APR-Garments/',
    demo: 'https://github.com/akshayayuvaraj/APR-Garments',
    gradient: 'from-orange-500 to-pink-600',
  },
  {
    id: 4,
    title: 'Premium Job Board',
    description:
      'A modern, premium job board platform built with React, Tailwind CSS, Firebase, and React Three Fiber. Features include 3D interactive UI, glassmorphism design, authentication system, job listings, and animated dashboard.',
    tags:  ["React", "Tailwind CSS", "Firebase", "Three.js", "Framer Motion"],
    image: job,
    category: 'Backend',
    github: 'https://github.com/akshayayuvaraj/premium-jobs',
    demo: 'https://premium-job.netlify.app/',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 5,
    title: 'Lumina Quiz',
    description:
      'An AI-powered quiz platform built with React and Firebase. Allows users to create quizzes using AI or manually, play interactive quizzes, track scores, and view real-time results with premium UI and floating 3D animations.',
    tags: ["React", "Firebase", "AI Integration", "Framer Motion"],
    image: quiz,
    category: 'Full Stack',
    github: 'https://github.com/akshayayuvaraj/lumina-quiz',
    demo: 'https://lumina-quiz-gules.vercel.app/',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 6,
    title: 'SkyGlass Weather',
    description:
      'A web application that displays real-time weather information using API integration. Users can search any location and view live weather updates with a clean and responsive UI..',
    tags: ['React', 'API Integration', 'CSS'],
    image: api,
    category: 'Full Stack',
    github: 'https://github.com/akshayayuvaraj/skyglass-weather',
    demo: 'https://skyglass-weather.vercel.app/',
    gradient: 'from-sky-500 to-indigo-600',
  },
]

const filters = ['All', 'Full Stack', 'Frontend', 'Backend']

export default function Projects() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="w-full py-20 bg-gray-50 dark:bg-[#0a1628]">
      {/* Container expanded to max-w-7xl for a wide layout display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Projects
            </span>
            <h2 className="section-title mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              Things I've built
            </h2>
            <p className="section-subtitle max-w-xl mx-auto mt-2 text-gray-500 dark:text-gray-400">
              A selection of projects that demonstrate my skills across the stack.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActive(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active === filter
                      ? 'bg-white dark:bg-[#161b2e] text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Project Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col group"
    >
      {/* Card Visual Header */}
      <div className="h-48 relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
            <HiCode size={48} className="text-white/30" />
          </div>
        )}

        {project.featured && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white rounded-full">
            Featured
          </span>
        )}
        {project.isLive && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base">
              {project.title}
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full whitespace-nowrap">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiGithub size={14} /> Code
          </a>
          
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}