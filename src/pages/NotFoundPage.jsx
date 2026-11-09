import { FiArrowLeft, FiCompass } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import './content-pages.css'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." path="/404" />
      <section className="not-found-page">
        <span className="not-found-orbit not-found-orbit-one" aria-hidden="true" />
        <span className="not-found-orbit not-found-orbit-two" aria-hidden="true" />
        <span className="not-found-code">404</span>
        <FiCompass className="not-found-icon" aria-hidden="true" />
        <p className="section-eyebrow">A WRONG TURN IN THE DIGITAL UNIVERSE</p>
        <h1>This page isn&apos;t<br /><span>on the map.</span></h1>
        <p className="not-found-description">The address may have changed, or this page may never have existed. Let&apos;s head somewhere familiar.</p>
        <Link to="/" className="hero-button hero-button-primary"><FiArrowLeft aria-hidden="true" /> Back home</Link>
      </section>
    </>
  )
}
