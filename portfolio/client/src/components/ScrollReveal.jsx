import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * ScrollReveal
 * A drop-in wrapper that fades + slides children into view on scroll.
 *
 * Usage:
 *   <ScrollReveal>
 *     <MyCard />
 *   </ScrollReveal>
 *
 * Props:
 *   variant  - 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' (default: 'fadeUp')
 *   delay    - animation delay in seconds (default: 0)
 *   className - optional extra classes on the wrapper div
 */

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.55,
  className = '',
}) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}