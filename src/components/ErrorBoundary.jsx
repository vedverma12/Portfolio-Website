import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen">
          <p className="eyebrow">A small detour</p>
          <h1>That page hit a snag.</h1>
          <p>Try reloading the page. If the issue continues, come back in a moment.</p>
          <button type="button" className="button button-primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
