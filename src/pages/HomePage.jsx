import { Helmet } from 'react-helmet-async'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import AnimatedCounter from '../components/AnimatedCounter'
import GithubShowcase from '../components/GithubShowcase'
import MagneticLink from '../components/MagneticLink'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import TypingRole from '../components/TypingRole'
import { siteData } from '../data/siteData'
import './home.css'

const skillNames = siteData.skills.flatMap(({ items }) => items.map(({ name }) => name))
const featuredProjects = siteData.home.featuredProjectSlugs
  .map((slug) => siteData.projects.find((project) => project.slug === slug))
  .filter(Boolean)

function SocialLink({ href, label, children }) {
  return (
    <a className="hero-social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function HomePage() {
  const { person, home, seo } = siteData

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="home-hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="home-container hero-content">
          <Reveal className="hero-copy">
            <p className="hero-eyebrow"><span className="status-dot" /> BUILDING WEB EXPERIENCES</p>
            <h1 className="font-display">
              <span className="hero-greeting">Hi, I&apos;m</span>
              <span className="hero-name">{person.name.split(' ')[0]}<br />{person.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="hero-role-label">I&apos;m a <TypingRole roles={person.roleWords} /></p>
            <p className="hero-description">{home.intro}</p>
            <div className="hero-actions">
              <MagneticLink to="/projects" className="hero-button hero-button-primary">
                View projects <FiArrowUpRight aria-hidden="true" />
              </MagneticLink>
              <MagneticLink
                href={person.resumePath}
                download="Ved-Verma-Resume.pdf"
                className="hero-button hero-button-secondary"
              >
                Download resume <FiArrowDown aria-hidden="true" />
              </MagneticLink>
            </div>
            <div className="hero-social-row">
              <span>FIND ME ON</span>
              <SocialLink href={person.github} label="Open Ved Verma's GitHub profile">
                <FiGithub aria-hidden="true" />
              </SocialLink>
              <SocialLink href={person.linkedin} label="Open Ved Verma's LinkedIn profile">
                <FiLinkedin aria-hidden="true" />
              </SocialLink>
              <Link className="hero-contact-link" to="/contact">Contact me <FiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </Reveal>

          <Reveal className="hero-art-wrap" delay={0.14}>
            <div className="hero-art">
              <div className="hero-art-ring hero-art-ring-outer" />
              <div className="hero-art-ring hero-art-ring-inner" />
              <div className="hero-art-core">
                <span className="hero-art-mark">V<span>.</span></span>
                <span className="hero-art-caption">DEVELOPER<br />IN PROGRESS</span>
              </div>
              <div className="hero-art-float hero-art-float-top"><FiStar /><span>Ideas → interfaces</span></div>
              <div className="hero-art-float hero-art-float-bottom"><span className="mini-code">&lt;/&gt;</span><span>Curiosity-driven</span></div>
              <span className="hero-orb hero-orb-pink" />
              <span className="hero-orb hero-orb-cyan" />
            </div>
          </Reveal>

          <a className="scroll-cue" href="#selected-work" aria-label="Scroll to selected projects">
            <span>SCROLL TO EXPLORE</span>
            <FiArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="home-section selected-work" id="selected-work">
        <div className="home-container">
          <Reveal className="section-heading-row">
            <div>
              <p className="section-eyebrow">A FEW THINGS I&apos;VE BUILT</p>
              <h2>Selected <span>work</span></h2>
            </div>
            <Link className="text-link" to="/projects">All projects <FiArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <div className="home-project-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-band" aria-label="Technologies used across featured projects">
        <div className="skills-band-heading"><span>TOOLS IN MY WORKBENCH</span><span>TOOLS IN MY WORKBENCH</span></div>
        <div className="skills-marquee">
          <div className="skills-marquee-track">
            {[...skillNames, ...skillNames].map((skill, index) => (
              <span className="skill-marquee-item" key={`${skill}-${index}`}>
                <span className="skill-marquee-dot" aria-hidden="true" />{skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <GithubShowcase />

      <section className="home-section snapshot-section">
        <div className="home-container snapshot-grid">
          <Reveal className="snapshot-intro">
            <p className="section-eyebrow">A LITTLE CONTEXT</p>
            <h2>Learning by <span>building.</span></h2>
            <p>{person.education}. My projects explore interfaces, routing, and data persistence.</p>
            <Link className="text-link" to="/about">More about me <FiArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <div className="snapshot-cards">
            {home.statistics.map((stat) => (
              <Reveal key={stat.label} className="snapshot-card">
                <span className="snapshot-number"><AnimatedCounter value={stat.value} /></span>
                <span className="snapshot-label">{stat.label}</span>
              </Reveal>
            ))}
            <Reveal className="snapshot-card snapshot-card-education" delay={0.08}>
              <span className="snapshot-card-label">CURRENTLY STUDYING</span>
              <strong>Computer Science<br />&amp; Engineering</strong>
              <span className="snapshot-card-meta">Bennett University</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-container">
          <Reveal className="home-cta">
            <span className="cta-glow" aria-hidden="true" />
            <p className="section-eyebrow">OPEN THE NEXT TAB</p>
            <h2>{home.closingLine}</h2>
            <p>Have a project, question, or just want to say hello?</p>
            <MagneticLink to="/contact" className="hero-button hero-button-primary">
              Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
            </MagneticLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
