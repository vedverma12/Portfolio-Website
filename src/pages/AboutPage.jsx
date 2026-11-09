import { FiArrowUpRight, FiBookOpen, FiCode } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DeveloperTerminal from '../components/DeveloperTerminal'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import './content-pages.css'

export default function AboutPage() {
  const { person, about } = siteData
  const education = siteData.timeline.find((item) => item.kind === 'education')

  return (
    <>
      <Seo title="About" description={`Meet ${person.name}, ${person.role} and CSE student at Bennett University.`} path="/about" />
      <div className="page-container">
        <section className="page-hero about-hero">
          <Reveal className="page-hero-copy">
            <p className="section-eyebrow">A LITTLE ABOUT ME</p>
            <h1 className="font-display">Curious by nature.<br /><span>Builder by practice.</span></h1>
            <p>{about.story}</p>
          </Reveal>
          <Reveal className="profile-frame" delay={0.12}>
            <img src={person.profileImage} alt={`Portrait of ${person.name}`} loading="lazy" />
            <span className="profile-frame-caption">VED VERMA · DEVELOPER</span>
          </Reveal>
        </section>

        <section className="about-bento">
          <Reveal className="bento-card bento-story">
            <span className="bento-icon"><FiCode aria-hidden="true" /></span>
            <p className="section-eyebrow">WHAT I&apos;M BUILDING</p>
            <h2>Turning ideas into useful things on the web.</h2>
            <p>{about.focus}</p>
            <Link to="/projects" className="text-link">Explore the projects <FiArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <Reveal className="bento-card bento-education" delay={0.06}>
            <span className="bento-icon"><FiBookOpen aria-hidden="true" /></span>
            <p className="section-eyebrow">CURRENT CHAPTER</p>
            <h2>{education.title}</h2>
            <p>{education.organization}</p>
            <span className="bento-status">{education.status}</span>
            <span className="education-date">{education.dateLabel}</span>
          </Reveal>
          <Reveal className="bento-card bento-interests" delay={0.12}>
            <p className="section-eyebrow">OFF THE KEYBOARD</p>
            <h2>Things I&apos;m into</h2>
            <div className="interest-chips">
              {about.interests.map((interest) => <span className="interest-chip" key={interest}>{interest}</span>)}
            </div>
          </Reveal>
        </section>

        <section className="terminal-section">
          <Reveal className="terminal-intro">
            <p className="section-eyebrow">A SMALL EASTER EGG</p>
            <h2>Try a command.</h2>
            <p>A tiny terminal with a few safe, helpful shortcuts. No shell access—just portfolio navigation.</p>
          </Reveal>
          <Reveal delay={0.08}><DeveloperTerminal /></Reveal>
        </section>
      </div>
    </>
  )
}
