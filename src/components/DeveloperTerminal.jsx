import { useState } from 'react'
import { FiCornerDownLeft, FiTerminal } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { siteData } from '../data/siteData'

const helpText = 'Commands: help, about, skills, projects, contact, clear'

export default function DeveloperTerminal() {
  const navigate = useNavigate()
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([])

  const submitCommand = (event) => {
    event.preventDefault()
    const value = command.trim().toLowerCase()
    if (!value) return
    setCommand('')

    if (value === 'clear') {
      setHistory([])
      return
    }

    const replies = {
      help: helpText,
      about: `${siteData.person.name} — ${siteData.person.role}. ${siteData.person.education}.`,
      skills: siteData.skills.map(({ category }) => category).join(' · '),
      projects: siteData.projects.map(({ cardTitle }) => cardTitle).join(' · '),
      contact: 'Opening the contact page…',
    }
    const reply = replies[value] ?? `Command not found: ${value}. Type "help" to see what this console can do.`
    setHistory((items) => [...items, { command: value, reply }].slice(-6))
    if (value === 'contact') navigate('/contact')
  }

  return (
    <section className="terminal-card" aria-labelledby="terminal-title">
      <div className="terminal-topbar">
        <span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span>
        <h3 id="terminal-title"><FiTerminal aria-hidden="true" /> VED@PORTFOLIO <span>— interactive console</span></h3>
        <span className="terminal-live">LIVE</span>
      </div>
      <div className="terminal-screen">
        <p className="terminal-welcome">Welcome to the tiny corner of the internet that runs on curiosity.</p>
        <p className="terminal-help">{helpText}</p>
        <div className="terminal-history" role="log" aria-live="polite">
          {history.map((item, index) => (
            <div className="terminal-entry" key={`${item.command}-${index}`}>
              <p><span className="terminal-prompt">ved@portfolio:~$</span> {item.command}</p>
              <p className="terminal-reply">{item.reply}</p>
            </div>
          ))}
        </div>
        <form className="terminal-form" onSubmit={submitCommand}>
          <label className="terminal-prompt" htmlFor="terminal-command">ved@portfolio:~$</label>
          <input
            id="terminal-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Enter a terminal command"
          />
          <button type="submit" aria-label="Run command"><FiCornerDownLeft aria-hidden="true" /></button>
        </form>
      </div>
    </section>
  )
}
