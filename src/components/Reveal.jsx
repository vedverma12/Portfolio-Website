import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className, delay = 0, distance = 18, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
