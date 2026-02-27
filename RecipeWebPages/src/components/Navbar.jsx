import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
          <i className="ri-restaurant-2-fill" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-zinc-900">RecipeWeb</div>
          <div className="text-xs text-zinc-500">Cook • Save • Love</div>
        </div>
      </NavLink>

      <nav className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
        <NavLink
          className={(e) =>
            e.isActive
              ? "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800"
              : "rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={(e) =>
            e.isActive
              ? "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800"
              : "rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          }
          to="/recipes"
        >
          Recipes
        </NavLink>
        <NavLink
          className={(e) =>
            e.isActive
              ? "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800"
              : "rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={(e) =>
            e.isActive
              ? "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800"
              : "rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          }
          to="/create-recipes"
        >
          Create
        </NavLink>
        <NavLink
          className={(e) =>
            e.isActive
              ? "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800"
              : "rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          }
          to="/fav"
        >
          Favourites
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
