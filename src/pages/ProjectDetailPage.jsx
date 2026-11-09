import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCheck, FiCode } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import ProjectActions from '../components/ProjectActions'
import Reveal from '../components/Reveal'
import ScreenshotGallery from '../components/ScreenshotGallery'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import { getProjectScreenshots } from '../data/projectScreenshots'
import './content-pages.css'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const projectIndex = siteData.projects.findIndex((item) => item.slug === slug)
  const project = siteData.projects[projectIndex]

  if (!project) return <NotFoundPage />

  const previous = siteData.projects[(projectIndex - 1 + siteData.projects.length) % siteData.projects.length]
  const next = siteData.projects[(projectIndex + 1) % siteData.projects.length]
  const projectWithScreenshots = {
    ...project,
    screenshots: [...getProjectScreenshots(project.slug), ...project.screenshots],
  }

  return (
    <>
      <Seo title={project.cardTitle} description={project.summary} path={`/projects/${project.slug}`} />
      <div className={`page-container detail-page detail-${project.slug}`}>
        <Link className="back-link" to="/projects"><FiArrowLeft aria-hidden="true" /> All projects</Link>
        <section className="detail-hero">
          <Reveal className="detail-hero-copy">
            <p className="section-eyebrow">{project.category} · PROJECT 0{projectIndex + 1}</p>
            <h1>{project.name}</h1>
            <p>{project.overview}</p>
            <ProjectActions project={project} />
          </Reveal>
          <Reveal className={`detail-art project-card--${project.slug}`} delay={0.12}>
            <span className="detail-art-grid" aria-hidden="true" />
            <span className="detail-art-title">{project.cardTitle}</span>
            <span className="detail-art-symbol" aria-hidden="true"><FiCode /></span>
            <span className="detail-art-tag">BUILT WITH INTENTION</span>
          </Reveal>
        </section>

        <section className="detail-overview">
          <Reveal className="detail-copy-block">
            <p className="section-eyebrow">THE BRIEF</p>
            <h2>From a problem<br />to a <span>solution.</span></h2>
          </Reveal>
          <Reveal className="detail-problem-solution" delay={0.08}>
            <article><span>01 · PROBLEM</span><p>{project.problem}</p></article>
            <article><span>02 · APPROACH</span><p>{project.solution}</p></article>
          </Reveal>
        </section>

        <section className="detail-features-section">
          <Reveal>
            <p className="section-eyebrow">WHAT IT DOES</p>
            <h2>Key <span>features.</span></h2>
          </Reveal>
          <div className="detail-features-grid">
            {project.features.map((feature, index) => (
              <Reveal key={feature} delay={index * 0.04}>
                <article className="detail-feature"><span><FiCheck aria-hidden="true" /></span><p>{feature}</p></article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="detail-gallery-section">
          <Reveal className="detail-gallery-heading">
            <div><p className="section-eyebrow">A CLOSER LOOK</p><h2>Visual <span>notes.</span></h2></div>
            <p>Explore screenshots from the project. Select an image to view it in detail.</p>
          </Reveal>
          <ScreenshotGallery project={projectWithScreenshots} />
        </section>

        <section className="detail-stack-section">
          <Reveal>
            <p className="section-eyebrow">THE BUILD</p>
            <h2>Tools of the <span>trade.</span></h2>
          </Reveal>
          <div className="detail-stack-list">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="detail-learning-grid">
            <Reveal><article><span>CHALLENGE</span><p>{project.challenge}</p></article></Reveal>
            <Reveal delay={0.08}><article><span>IMPLEMENTATION NOTE</span><p>{project.learning}</p></article></Reveal>
          </div>
        </section>

        <section className="detail-next-projects">
          <Link to={`/projects/${previous.slug}`} className="project-pagination">
            <span><FiArrowLeft aria-hidden="true" /> PREVIOUS PROJECT</span><strong>{previous.cardTitle}</strong>
          </Link>
          <Link to={`/projects/${next.slug}`} className="project-pagination project-pagination-next">
            <span>NEXT PROJECT <FiArrowRight aria-hidden="true" /></span><strong>{next.cardTitle}</strong><FiArrowUpRight className="pagination-open" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </>
  )
}
