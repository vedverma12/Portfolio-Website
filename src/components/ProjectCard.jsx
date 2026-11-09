import { FiGrid, FiLink, FiShield } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ProjectActions from './ProjectActions'

const projectIcons = {
  'url-shortener': FiLink,
  'link-tree': FiGrid,
  'password-manager': FiShield,
}

export default function ProjectCard({ project, index = 0 }) {
  const Icon = projectIcons[project.slug] ?? FiGrid

  return (
    <article className={`project-card project-card--${project.slug}`} style={{ '--card-index': index }}>
      <Link
        className="project-card-link"
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.cardTitle} project details`}
      />
      <div className="project-card-art" aria-hidden="true">
        <div className="art-glow" aria-hidden="true" />
        <span className="art-index">0{index + 1}</span>
        <span className="art-icon" aria-hidden="true"><Icon /></span>
        <span className="art-caption">{project.category} / PROJECT</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-heading">
          <div>
            <p className="project-card-kicker">{project.category}</p>
            <h3 className="font-display">{project.cardTitle}</h3>
          </div>
        </div>
        <p className="project-card-summary">{project.summary}</p>
        <ul className="project-tech-list" aria-label="Technologies used">
          {project.stack.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
          {project.stack.length > 4 && <li>+{project.stack.length - 4}</li>}
        </ul>
        <ProjectActions project={project} />
      </div>
    </article>
  )
}
