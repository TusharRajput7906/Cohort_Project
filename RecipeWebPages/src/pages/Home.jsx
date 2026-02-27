import React, { useEffect } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'
const Home = () => {
  const getProduct = async () => {
    try {
      const response = await axios.get("/products");
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
              <i className="ri-fire-fill" />
              Simple recipes, saved in your browser
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Find your next favourite recipe
            </h1>
            <p className="max-w-prose text-sm leading-relaxed text-zinc-600">
              Browse your recipes, add new ones, and keep a list of favourites.
              Everything stays on your device using localStorage.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/recipes"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200 sm:w-auto"
              >
                Browse recipes
              </Link>
              <Link
                to="/create-recipes"
                className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-amber-100 sm:w-auto"
              >
                Create a recipe
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-16/11 overflow-hidden rounded-2xl bg-zinc-100">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
                alt="Recipe ingredients"
                loading="lazy"
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
                <div className="text-sm font-semibold text-zinc-900">Create</div>
                <div className="text-xs text-zinc-600">Add recipes with steps</div>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
                <div className="text-sm font-semibold text-zinc-900">Edit</div>
                <div className="text-xs text-zinc-600">Update anytime</div>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
                <div className="text-sm font-semibold text-zinc-900">Favourite</div>
                <div className="text-xs text-zinc-600">Save what you love</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
              <i className="ri-book-2-fill" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Your recipe library</h2>
              <p className="text-sm text-zinc-600">All recipes live inside this app.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-200">
              <i className="ri-heart-3-fill" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Favourites list</h2>
              <p className="text-sm text-zinc-600">Keep quick access to the best.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
