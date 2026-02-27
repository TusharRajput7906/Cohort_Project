import React, { useContext } from 'react'
import { recipecontext } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
const Recipes = () => {
  const { data } = useContext(recipecontext);

  // const recipes = data || []

  const renderRecipes = data.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe}/>
  ));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Recipes</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Tap a recipe to view, edit, or delete it.
          </p>
        </div>

        <Link
          to="/create-recipes"
          className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200 sm:w-auto"
        >
          <i className="ri-add-line mr-2" />
          New recipe
        </Link>
      </div>

      {data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderRecipes}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-zinc-50 text-zinc-700 ring-1 ring-zinc-200">
            <i className="ri-knife-fill" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-zinc-900">No recipes yet</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Create your first recipe and it will show up here.
          </p>
          <div className="mt-5">
            <Link
              to="/create-recipes"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200"
            >
              Create recipe
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Recipes
