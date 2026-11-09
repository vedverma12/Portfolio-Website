import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import CommandPalette from './CommandPalette'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Journey' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <NavLink className="brand-mark" to="/" onClick={closeMenu} aria-label="Ved Verma, home">
          <span className="brand-glyph">V.</span>
          <span className="brand-name">VED VERMA</span>
        </NavLink>

        <div className="desktop-nav">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <CommandPalette />
          <ThemeToggle />
          <NavLink to="/contact" className="nav-cta">
            Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
          </NavLink>
          <button
            type="button"
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
              >
                {label}
                <FiArrowUpRight aria-hidden="true" />
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
