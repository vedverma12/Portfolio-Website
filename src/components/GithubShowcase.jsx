import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiGitBranch, FiGithub, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { siteData } from '../data/siteData'
import './github-showcase.css'

const GITHUB_USER = 'vedverma12'

function RepoCard({ repo }) {
  return (
    <a className="github-repo-card" href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="github-repo-top">
        <FiGitBranch aria-hidden="true" />
        <span className="github-repo-language">{repo.language || 'Repository'}</span>
      </div>
      <strong>{repo.name}</strong>
      <p>{repo.description || 'Public repository on GitHub.'}</p>
      <span className="github-repo-stars"><FiStar aria-hidden="true" /> {repo.stargazers_count}</span>
    </a>
  )
}

export default function GithubShowcase() {
  const [github, setGithub] = useState({ loading: true, profile: null, repos: [], unavailable: false })

  useEffect(() => {
    const controller = new AbortController()
    const options = { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } }

    async function loadGithubData() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`, options),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`, options),
        ])
        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error(`GitHub returned ${profileResponse.status || reposResponse.status}.`)
        }
        const [profile, repos] = await Promise.all([profileResponse.json(), reposResponse.json()])
        if (!Array.isArray(repos)) throw new Error('GitHub returned an unexpected repository list.')
        setGithub({ loading: false, profile, repos, unavailable: false })
      } catch (error) {
        if (error.name === 'AbortError') return
        setGithub({ loading: false, profile: null, repos: [], unavailable: true })
      }
    }

    loadGithubData()
    return () => controller.abort()
  }, [])

  const fallbackRepos = siteData.projects.map((project) => ({
    name: project.cardTitle,
    html_url: project.sourceUrl,
    description: project.summary,
    language: project.stack[0],
    stargazers_count: null,
    slug: project.slug,
  }))

  return (
    <section className="home-section github-section">
      <div className="home-container">
        <div className="github-section-heading">
          <div>
            <p className="section-eyebrow">LIVE FROM GITHUB</p>
            <h2>Code in the <span>open.</span></h2>
          </div>
          <a className="github-profile-link" href={siteData.person.github} target="_blank" rel="noreferrer">
            <FiGithub aria-hidden="true" /> View profile <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
        {github.loading ? (
          <div className="github-loading-grid" aria-label="Loading GitHub repositories" role="status">
            {[0, 1, 2].map((item) => <div className="github-skeleton" key={item}><span /><span /><span /></div>)}
          </div>
        ) : github.unavailable ? (
          <div className="github-fallback">
            <p>GitHub data is temporarily unavailable. Here are the repositories featured in this portfolio.</p>
            <div className="github-repo-grid">
              {fallbackRepos.map((repo) => (
                <div className="github-repo-card github-repo-fallback" key={repo.slug}>
                  <div className="github-repo-top"><FiGitBranch aria-hidden="true" /><span>{repo.language}</span></div>
                  <strong>{repo.name}</strong>
                  <p>{repo.description}</p>
                  <Link to={`/projects/${repo.slug}`}>Project details <FiArrowUpRight aria-hidden="true" /></Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="github-stats">
              <div><strong>{github.profile.public_repos}</strong><span>Public repositories</span></div>
              <div><strong>{github.profile.followers}</strong><span>Followers</span></div>
              <p>Fetched live from GitHub&apos;s public API.</p>
            </div>
            <div className="github-repo-grid">
              {github.repos.slice(0, 3).map((repo) => <RepoCard repo={repo} key={repo.id} />)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
