import { FiBookOpen, FiCalendar, FiCode, FiFlag } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import './content-pages.css'

const timelineIcons = { education: FiBookOpen, hackathon: FiFlag, learning: FiCode }

export default function ExperiencePage() {
  return (
    <>
      <Seo title="Experience & Education" description="Education and learning milestones shared by Ved Verma." path="/experience" />
      <div className="page-container">
        <section className="page-intro">
          <Reveal>
            <p className="section-eyebrow">THE JOURNEY SO FAR</p>
            <h1>Learning in <span>progress.</span></h1>
            <p>A look at my education, team experiences, and what I’m learning now.</p>
          </Reveal>
        </section>
        <section className="timeline" aria-label="Education and experience timeline">
          {siteData.timeline.map((item, index) => {
            const Icon = timelineIcons[item.kind] ?? FiCalendar
            return (
              <Reveal key={item.kind} delay={index * 0.07} className="timeline-item">
                <span className="timeline-marker"><Icon aria-hidden="true" /></span>
                <article className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-kind">{item.kind}</span>
                    <span className="timeline-date"><FiCalendar aria-hidden="true" /> {item.dateLabel}</span>
                  </div>
                  <h2>{item.title}</h2>
                  {item.organization && <p className="timeline-organization">{item.organization}</p>}
                  {item.status && <span className="timeline-status">{item.status}</span>}
                  <p className="timeline-description">{item.description}</p>
                  {item.image && (
                    <figure className="timeline-image">
                      <img src={item.image} alt={item.imageAlt} loading="lazy" />
                      <figcaption>{item.imageCaption}</figcaption>
                    </figure>
                  )}
                </article>
              </Reveal>
            )
          })}
        </section>
      </div>
    </>
  )
}
