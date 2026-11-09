import { useMemo, useState } from 'react'
import { FiLayers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import './content-pages.css'

const categories = ['All', ...siteData.skills.map(({ category }) => category)]

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const skills = useMemo(() => siteData.skills
    .filter((group) => activeCategory === 'All' || group.category === activeCategory)
    .flatMap((group) => group.items.map((skill) => ({ ...skill, category: group.category }))),
  [activeCategory])
  const projectCount = siteData.projects.length

  return (
    <>
      <Seo title="Skills" description="Explore the tools and technologies used in Ved Verma's featured web projects." path="/skills" />
      <div className="page-container">
        <section className="page-intro">
          <Reveal>
            <p className="section-eyebrow">THE TOOLKIT</p>
            <h1>Skills &amp; <span>technologies.</span></h1>
            <p>These are the technologies present in the three inspected projects. The bars show project usage—not a self-rated proficiency score.</p>
          </Reveal>
        </section>

        <div className="filter-tabs" role="group" aria-label="Filter skills by category">
          {categories.map((category) => (
            <button
              type="button"
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? 'filter-tab is-active' : 'filter-tab'}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="skills-grid" aria-live="polite">
          {skills.map((skill, index) => {
            const usedCount = skill.projects.length
            const usage = Math.round((usedCount / projectCount) * 100)
            return (
              <Reveal key={skill.name} delay={index % 4 * 0.045}>
                <article className="skill-card">
                  <div className="skill-card-top">
                    <span className="skill-icon"><FiLayers aria-hidden="true" /></span>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                  <h2>{skill.name}</h2>
                  <p>{skill.evidence}</p>
                  <div className="skill-usage-copy"><span>Project usage</span><strong>{usedCount} / {projectCount}</strong></div>
                  <div
                    className="skill-usage-track"
                    role="progressbar"
                    aria-label={`${skill.name} project usage`}
                    aria-valuemin={0}
                    aria-valuemax={projectCount}
                    aria-valuenow={usedCount}
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${usage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                    />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </section>
      </div>
    </>
  )
}
