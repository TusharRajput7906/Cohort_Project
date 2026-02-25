import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import About from '../pages/About'
import Create from '../pages/Create'
import SingleRecipe from '../pages/SingleRecipe'
const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipes' element={<Recipes/>}/>
        <Route path='/recipes/details/:id' element={<SingleRecipe/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/create-recipes' element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default Mainroute
