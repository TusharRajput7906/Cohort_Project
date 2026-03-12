import { useState } from 'react'
import './App.css'

function App() {
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch('/api/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: inputUrl }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Something went wrong.')
      } else {
        setResult(data.shortUrl)
        setHistory(prev => [{ original: inputUrl, short: data.shortUrl }, ...prev])
        setInputUrl('')
      }
    } catch {
      setError('Failed to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy(url, index) {
    await navigator.clipboard.writeText(url)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-icon">🔗</div>
        <h1>URL Shortener</h1>
        <p>Paste a long URL and get a short link instantly</p>
      </header>

      <main className="main">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="url"
              className="url-input"
              placeholder="https://example.com/very/long/url..."
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              required
            />
            <button type="submit" className="shorten-btn" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {error && <div className="error-box">⚠ {error}</div>}

        {result && (
          <div className="result-box">
            <span className="result-label">Your short URL is ready!</span>
            <div className="result-link-row">
              <a href={result} target="_blank" rel="noreferrer" className="result-link">
                {result}
              </a>
              <button className="copy-btn" onClick={() => handleCopy(result, 'result')}>
                {copiedIndex === 'result' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <section className="history">
            <h2>Recent Links</h2>
            <div className="history-list">
              {history.map((item, i) => (
                <div className="history-item" key={i}>
                  <div className="history-urls">
                    <span className="history-original" title={item.original}>
                      {item.original.length > 50
                        ? item.original.slice(0, 47) + '...'
                        : item.original}
                    </span>
                    <span className="history-arrow">→</span>
                    <a
                      href={item.short}
                      target="_blank"
                      rel="noreferrer"
                      className="history-short"
                    >
                      {item.short}
                    </a>
                  </div>
                  <button
                    className="copy-btn small"
                    onClick={() => handleCopy(item.short, i)}
                  >
                    {copiedIndex === i ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
    
