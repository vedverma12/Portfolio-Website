import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function Preloader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 520)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Loading Ved Verma's portfolio"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <div className="preloader-mark">V<span>.</span></div>
          <span className="preloader-caption">LOADING PORTFOLIO</span>
          <span className="preloader-line" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
