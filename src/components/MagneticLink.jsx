import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionRouterLink = motion.create(Link)

export default function MagneticLink({ to, href, children, className = '', download, target, rel }) {
  const elementRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduceMotion = useReducedMotion()
  const Component = to ? MotionRouterLink : motion.a

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = elementRef.current?.getBoundingClientRect()
    if (!bounds) return
    setOffset({
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.09,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.09,
    })
  }

  const handlePointerLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <Component
      ref={elementRef}
      to={to}
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={className}
      animate={reduceMotion ? undefined : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.35 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </Component>
  )
}
