import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX } from 'react-icons/fi'

function getImageDetails(item, index) {
  if (typeof item === 'string') return { src: item, alt: `Project screenshot ${index + 1}`, caption: `Screenshot ${index + 1}` }
  return { src: item.src, alt: item.alt || `Project screenshot ${index + 1}`, caption: item.caption || `Screenshot ${index + 1}` }
}

export default function ScreenshotGallery({ project }) {
  const screenshots = project.screenshots ?? []
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(null)
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const items = screenshots.map(getImageDetails)

  useEffect(() => {
    if (activeIndex === null) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % items.length)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + items.length) % items.length)
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled)')
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
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, items.length])

  const activeItem = activeIndex === null ? null : items[activeIndex]

  return (
    <>
      <div className={`screenshot-grid screenshot-grid--${project.slug}`}>
        {items.map((item, index) => (
          <button
            className="screenshot-tile"
            type="button"
            onClick={(event) => {
              returnFocusRef.current = event.currentTarget
              setActiveIndex(index)
            }}
            key={`${item.caption}-${index}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span className="screenshot-expand"><FiMaximize2 aria-hidden="true" /><span className="sr-only">Enlarge {item.caption}</span></span>
          </button>
        ))}
      </div>

      <AnimatePresence onExitComplete={() => returnFocusRef.current?.focus()}>
        {activeItem && (
          <motion.div
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.cardTitle}: ${activeItem.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveIndex(null)
            }}
          >
            <motion.div
              ref={dialogRef}
              className="lightbox-panel"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              <div className="lightbox-toolbar">
                <span>{activeItem.caption} <small>{activeIndex + 1} / {items.length}</small></span>
                <button ref={closeButtonRef} type="button" onClick={() => setActiveIndex(null)} aria-label="Close screenshot preview"><FiX /></button>
              </div>
              <img className="lightbox-image" src={activeItem.src} alt={activeItem.alt} />
              <div className="lightbox-controls">
                <button type="button" onClick={() => setActiveIndex((index) => (index - 1 + items.length) % items.length)} aria-label="Previous screenshot"><FiArrowLeft /> Previous</button>
                <button type="button" onClick={() => setActiveIndex((index) => (index + 1) % items.length)} aria-label="Next screenshot">Next <FiArrowRight /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
