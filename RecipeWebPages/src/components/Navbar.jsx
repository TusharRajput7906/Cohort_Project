import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center gap-x-16'>
      <NavLink className={(e)=>e.isActive ? "text-red-300" :""} to="/">Home</NavLink>
      <NavLink className={(e)=>e.isActive ? "text-red-300" :""} to="/recipes">Recipes</NavLink>
      <NavLink className={(e)=>e.isActive ? "text-red-300" :""} to="/about">About</NavLink>
      <NavLink className={(e)=>e.isActive ? "text-red-300" :""} to="/create-recipes">Create-Recipes</NavLink>
    </div>
  )
}

export default Navbar
