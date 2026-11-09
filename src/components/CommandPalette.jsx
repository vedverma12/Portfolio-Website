import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiCommand, FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { siteData } from '../data/siteData'
import { useTheme } from '../context/useTheme'

const pageCommands = [
  { label: 'Home', hint: 'Go to the homepage', to: '/' },
  { label: 'About', hint: 'Background and developer terminal', to: '/about' },
  { label: 'Skills', hint: 'Explore technologies', to: '/skills' },
  { label: 'Projects', hint: 'Browse all projects', to: '/projects' },
  { label: 'Experience & Education', hint: 'Open the timeline', to: '/experience' },
  { label: 'Contact', hint: 'Send a message', to: '/contact' },
]

export default function CommandPalette() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const wasOpen = useRef(false)

  const commands = useMemo(() => [
    ...pageCommands,
    ...siteData.projects.map((project) => ({
      label: project.cardTitle,
      hint: `${project.category} project`,
      to: `/projects/${project.slug}`,
    })),
    {
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      hint: 'Change appearance',
      action: toggleTheme,
      icon: theme === 'dark' ? FiSun : FiMoon,
    },
    {
      label: 'Open GitHub profile',
      hint: 'Open in a new tab',
      href: siteData.person.github,
      icon: FiArrowUpRight,
    },
  ], [theme, toggleTheme])

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.hint}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      inputRef.current?.focus()
    } else if (wasOpen.current) {
      wasOpen.current = false
      triggerRef.current?.focus()
    }
  }, [open])

  const execute = (command) => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
    if (command.action) command.action()
    else if (command.to) navigate(command.to)
    else if (command.href) window.open(command.href, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, filteredCommands.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && filteredCommands[activeIndex]) {
      event.preventDefault()
      execute(filteredCommands[activeIndex])
    } else if (event.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll('input, button:not(:disabled)')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="command-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <FiSearch aria-hidden="true" />
        <span>Quick find</span>
        <kbd><FiCommand aria-hidden="true" /> K</kbd>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false)
            }}
          >
            <motion.div
              ref={dialogRef}
              className="command-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              onKeyDown={handleKeyDown}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: reduceMotion ? 0 : 0.16 }}
            >
              <div className="command-search">
                <FiSearch aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
                  placeholder="Search pages, projects, actions…"
                  aria-label="Search commands"
                />
                <kbd>ESC</kbd>
              </div>
              <div className="command-results" role="listbox" aria-label="Commands">
                {filteredCommands.length ? filteredCommands.map((command, index) => {
                  const Icon = command.icon ?? FiArrowUpRight
                  return (
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`command-option${index === activeIndex ? ' is-selected' : ''}`}
                      key={command.label}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => execute(command)}
                    >
                      <span className="command-option-icon"><Icon aria-hidden="true" /></span>
                      <span className="command-option-copy"><strong>{command.label}</strong><small>{command.hint}</small></span>
                      <FiArrowUpRight className="command-option-arrow" aria-hidden="true" />
                    </button>
                  )
                }) : <p className="command-empty">No commands match “{query}”.</p>}
              </div>
              <div className="command-hint"><span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
