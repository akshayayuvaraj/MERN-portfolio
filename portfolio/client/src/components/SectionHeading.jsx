import { motion } from 'framer-motion'
import { fadeUp } from '../animations/variants'

/**
 * SectionHeading
 * Consistent header for every section.
 *
 * Props:
 *   eyebrow  - small label above the title (e.g. "About Me")
 *   title    - main heading
 *   subtitle - optional supporting text
 *   center   - boolean, centres text (default: true)
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          {eyebrow}
        </span>
      )}
      <h2 className="section-title mt-2">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}