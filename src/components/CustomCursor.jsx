import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function CustomCursor() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined

    const root = document.documentElement
    const body = document.body
    const updatePosition = (event) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`)
      root.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    const pointerDown = () => body.classList.add('cursor-pressed')
    const pointerUp = () => body.classList.remove('cursor-pressed')

    body.classList.add('cursor-enhanced')
    window.addEventListener('pointermove', updatePosition, { passive: true })
    window.addEventListener('pointerdown', pointerDown, { passive: true })
    window.addEventListener('pointerup', pointerUp, { passive: true })

    return () => {
      body.classList.remove('cursor-enhanced', 'cursor-pressed')
      window.removeEventListener('pointermove', updatePosition)
      window.removeEventListener('pointerdown', pointerDown)
      window.removeEventListener('pointerup', pointerUp)
      root.style.removeProperty('--cursor-x')
      root.style.removeProperty('--cursor-y')
    }
  }, [reduceMotion])

  return <span className="custom-cursor" aria-hidden="true" />
}
