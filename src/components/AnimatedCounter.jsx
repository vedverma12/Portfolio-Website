import { useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedCounter({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const roundedCount = useTransform(count, (current) => Math.round(current))

  useEffect(() => {
    if (!isInView) return undefined
    if (reduceMotion) {
      count.set(value)
      return undefined
    }
    const controls = animate(count, value, { duration: 1.15, ease: 'easeOut' })
    return () => controls.stop()
  }, [count, isInView, reduceMotion, value])

  return <motion.span ref={ref}>{roundedCount}</motion.span>
}
