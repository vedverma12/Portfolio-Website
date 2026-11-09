import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function TypingRole({ roles }) {
  const reduceMotion = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (reduceMotion || roles.length < 2) {
      return undefined
    }

    const currentRole = roles[roleIndex]
    const isComplete = text === currentRole
    const delay = deleting ? 42 : isComplete ? 1250 : 82
    const timeout = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true)
      } else if (deleting && text.length === 0) {
        setDeleting(false)
        setRoleIndex((index) => (index + 1) % roles.length)
      } else {
        setText(deleting ? text.slice(0, -1) : currentRole.slice(0, text.length + 1))
      }
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [deleting, reduceMotion, roleIndex, roles, text])

  const visibleText = reduceMotion || roles.length < 2 ? roles[0] ?? '' : text

  return (
    <span className="typing-role" aria-label={roles.join(', ')}>
      <span aria-hidden="true">{visibleText || '\u00a0'}</span>
      {!reduceMotion && <span className="typing-caret" aria-hidden="true" />}
      <span className="sr-only">{roles[roleIndex]}</span>
    </span>
  )
}
