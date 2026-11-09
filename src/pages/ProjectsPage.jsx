import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import './content-pages.css'

const categories = ['All', ...new Set(siteData.projects.map(({ category }) => category))]
const technologies = [...new Set(siteData.projects.flatMap(({ stack }) => stack))]

export default function ProjectsPage() {
  const [category, setCategory] = useState('All')
  const [technology, setTechnology] = useState('All technologies')
  const [search, setSearch] = useState('')

  const filteredProjects = useMemo(() => siteData.projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category
    const matchesTechnology = technology === 'All technologies' || project.stack.includes(technology)
    const searchable = `${project.name} ${project.summary} ${project.stack.join(' ')}`.toLowerCase()
    return matchesCategory && matchesTechnology && searchable.includes(search.trim().toLowerCase())
  }), [category, technology, search])

  return (
    <>
      <Seo title="Projects" description="Browse Ved Verma's verified projects, technologies, and source code." path="/projects" />
      <div className="page-container">
        <section className="page-intro projects-intro">
          <Reveal>
            <p className="section-eyebrow">SELECTED BUILDS · 03</p>
            <h1>Projects with <span>purpose.</span></h1>
            <p>Small, end-to-end products that turn practical ideas into working web experiences.</p>
          </Reveal>
          <Reveal className="project-search-wrap" delay={0.08}>
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              aria-label="Search projects"
              placeholder="Search projects or technologies"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear project search">Clear</button>}
          </Reveal>
        </section>

        <section className="project-filters" aria-label="Project filters">
          <div className="filter-group">
            <span className="filter-label">CATEGORY</span>
            <div className="filter-tabs" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  type="button"
                  className={category === item ? 'filter-tab is-active' : 'filter-tab'}
                  aria-pressed={category === item}
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">TECHNOLOGY</span>
            <div className="filter-tabs technology-filters" role="group" aria-label="Filter by technology">
              <button
                type="button"
                className={technology === 'All technologies' ? 'filter-tab is-active' : 'filter-tab'}
                aria-pressed={technology === 'All technologies'}
                onClick={() => setTechnology('All technologies')}
              >
                All technologies
              </button>
              {technologies.map((item) => (
                <button
                  type="button"
                  className={technology === item ? 'filter-tab is-active' : 'filter-tab'}
                  aria-pressed={technology === item}
                  key={item}
                  onClick={() => setTechnology(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <h2 className="sr-only">Project results</h2>
        <div className="project-results-heading" aria-live="polite">
          <span>{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</span>
          {(category !== 'All' || technology !== 'All technologies' || search) && (
            <button type="button" className="clear-filters" onClick={() => { setCategory('All'); setTechnology('All technologies'); setSearch('') }}>
              Clear filters
            </button>
          )}
        </div>

        {filteredProjects.length ? (
          <section className="projects-grid" aria-label="Filtered projects">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} index={siteData.projects.indexOf(project)} />
              </Reveal>
            ))}
          </section>
        ) : (
          <div className="empty-projects" role="status">
            <h2>No matching projects.</h2>
            <p>Try a different search or clear the filters.</p>
            <button type="button" className="filter-tab is-active" onClick={() => { setCategory('All'); setTechnology('All technologies'); setSearch('') }}>Reset filters</button>
          </div>
        )}
      </div>
    </>
  )
}
