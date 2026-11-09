import { FiArrowUpRight } from 'react-icons/fi'
import './project-card.css'

export default function ProjectActions({ project }) {
  return (
    <div className="project-card-actions">
      {project.liveUrl ? (
        <a className="project-action project-action-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
          Live Demo <FiArrowUpRight aria-hidden="true" />
        </a>
      ) : (
        <span className="project-tooltip" title="Coming soon">
          <button
            type="button"
            className="project-action project-action-disabled"
            disabled
            aria-label={`Live demo for ${project.cardTitle} coming soon`}
          >
            Live Demo
          </button>
        </span>
      )}
      {project.sourceUrl ? (
        <a className="project-action project-action-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer">
          Source Code <FiArrowUpRight aria-hidden="true" />
        </a>
      ) : (
        <span className="project-tooltip" title="Source code link unavailable">
          <button
            type="button"
            className="project-action project-action-disabled"
            disabled
            aria-label={`Source code for ${project.cardTitle} unavailable`}
          >
            Source Code
          </button>
        </span>
      )}
    </div>
  )
}
