import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * useScrollReveal
 * Returns a ref and a boolean indicating whether the element is in view.
 * Use this to trigger Framer Motion animations on scroll.
 *
 * @param {Object} options
 * @param {string} options.margin - Intersection margin (default: '-80px')
 * @param {boolean} options.once - Animate only once (default: true)
 */
export function useScrollReveal({ margin = '-80px', once = true } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin })
  return { ref, isInView }
}