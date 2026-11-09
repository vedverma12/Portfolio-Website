import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useTheme } from '../context/useTheme'
import CustomCursor from './CustomCursor'
import Footer from './Footer'
import Navbar from './Navbar'
import Preloader from './Preloader'
import ScrollProgress from './ScrollProgress'
import './layout.css'
import 'react-toastify/dist/ReactToastify.css'

export default function SiteLayout() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [location.pathname, shouldReduceMotion])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <Preloader />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main-content"
          key={location.pathname}
          className="site-main"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: 'easeOut' }}
          tabIndex={-1}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3500} theme={theme} newestOnTop />
    </>
  )
}
