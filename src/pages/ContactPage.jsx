import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { siteData } from '../data/siteData'
import './content-pages.css'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export default function ContactPage() {
  const { contact } = siteData
  const [sending, setSending] = useState(false)
  const isConfigured = Object.values(emailConfig).every(Boolean)

  const copyEmail = async () => {
    if (!contact.email) {
      toast.info('Add your contact email in src/data/siteData.js to enable copy.')
      return
    }
    try {
      await navigator.clipboard.writeText(contact.email)
      toast.success('Email copied to clipboard.')
    } catch {
      toast.error('Clipboard access is unavailable. Please copy the email manually.')
    }
  }

  const submitMessage = async (event) => {
    event.preventDefault()
    if (!isConfigured) {
      toast.info('Email delivery is not configured yet. You can still reach me on GitHub or LinkedIn.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const templateParams = {
      from_name: formData.get('name'),
      reply_to: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    setSending(true)
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams, { publicKey: emailConfig.publicKey })
      toast.success('Message sent. Thanks for reaching out!')
      form.reset()
    } catch {
      toast.error('The message could not be sent. Please try again or reach out through GitHub or LinkedIn.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo title="Contact" description="Contact Ved Verma about a project, question, or collaboration." path="/contact" />
      <div className="page-container">
        <section className="contact-layout">
          <Reveal className="contact-copy">
            <p className="section-eyebrow">LET&apos;S CONNECT</p>
            <h1>Have something<br /><span>in mind?</span></h1>
            <p>Send a note about a project, a question, or anything you&apos;d like to discuss.</p>
            <div className="contact-direct">
              <span className="filter-label">FIND ME ELSEWHERE</span>
              <a href={contact.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub <span>@vedverma12</span></a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> LinkedIn <span>View profile</span></a>
              {contact.email ? (
                <button type="button" onClick={copyEmail}><FiCopy aria-hidden="true" /> {contact.email} <span>Copy email</span></button>
              ) : (
                <button type="button" onClick={copyEmail} title="Add your email in src/data/siteData.js"><FiCopy aria-hidden="true" /> Email <span>Add email in siteData.js</span></button>
              )}
            </div>
          </Reveal>

          <Reveal className="contact-form-card" delay={0.1}>
            <form className="contact-form" onSubmit={submitMessage}>
              <div className="contact-form-heading">
                <span className="contact-form-icon"><FiSend aria-hidden="true" /></span>
                <div><h2>Send a message</h2><p>Fields marked with * are required.</p></div>
              </div>
              {!isConfigured && (
                <p className="form-setup-note" role="status">
                  <FiCheck aria-hidden="true" /> Form is ready. Add EmailJS values from <code>.env.example</code> to enable delivery.
                </p>
              )}
              <label>
                <span>Your name *</span>
                <input type="text" name="name" autoComplete="name" maxLength="100" required placeholder="Name" />
              </label>
              <label>
                <span>Email address *</span>
                <input type="email" name="email" autoComplete="email" maxLength="254" required placeholder="you@example.com" />
              </label>
              <label>
                <span>Subject *</span>
                <input type="text" name="subject" maxLength="160" required placeholder="What would you like to talk about?" />
              </label>
              <label>
                <span>Message *</span>
                <textarea name="message" rows="5" minLength="10" maxLength="4000" required placeholder="Tell me a little about it…" />
              </label>
              <button className="hero-button hero-button-primary contact-submit" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'} <FiSend aria-hidden="true" />
              </button>
              <p className="contact-privacy-note">Your message is sent through the configured EmailJS service. It is not stored by this site.</p>
            </form>
          </Reveal>
        </section>
      </div>
    </>
  )
}
