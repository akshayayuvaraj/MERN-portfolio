import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { HiCode } from 'react-icons/hi'
import { hoverLift } from '../animations/variants'

/**
 * ProjectCard
 * Reusable card for displaying a project.
 *
 * Props:
 *   project.title       - string
 *   project.description - string
 *   project.tags        - string[]
 *   project.category    - string
 *   project.github      - URL string
 *   project.demo        - URL string | null
 *   project.gradient    - Tailwind gradient class e.g. 'from-blue-500 to-purple-600'
 *   project.featured    - boolean
 */
export default function ProjectCard({ project }) {
  return (
    <motion.article
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="card overflow-hidden flex flex-col group"
    >
      {/* Gradient banner */}
      <div
        className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <HiCode size={52} className="text-white/25" />
        {project.featured && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/60 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-700/60">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiGithub size={13} />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}