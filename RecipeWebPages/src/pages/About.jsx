import React from 'react'

const About = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">About</h1>
        <p className="text-sm leading-relaxed text-zinc-600">
          This is a simple recipe app where you can create, edit, delete, and favourite recipes.
          Recipes are stored locally in your browser (localStorage), so they stay on your device.
        </p>
      </header>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">How it works</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="mt-0.5 text-amber-600"><i className="ri-checkbox-circle-fill" /></span>
            Add recipes from the Create page.
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 text-amber-600"><i className="ri-checkbox-circle-fill" /></span>
            Click any recipe to view and edit details.
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 text-amber-600"><i className="ri-checkbox-circle-fill" /></span>
            Tap the heart icon on a recipe card to add/remove favourites.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
