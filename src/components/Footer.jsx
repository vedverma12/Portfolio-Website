import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" to="/">VED VERMA<span>© {CURRENT_YEAR}</span></Link>
        <p>Built with care and a curiosity for the web.</p>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://github.com/vedverma12" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/vedverma12" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin aria-hidden="true" />
          </a>
          <Link to="/contact" aria-label="Contact"><FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </footer>
  )
}
