import React from 'react'
import Mainroute from './routes/Mainroute'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="min-h-dvh w-full">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2 sm:py-3">
          <Navbar />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-6 pb-24 sm:py-8">
        <Mainroute />
      </main>

      <footer className="border-t border-zinc-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-zinc-500">
          Built with React + Vite • Recipes are saved in your browser
        </div>
      </footer>
    </div>
  )
}

export default App
