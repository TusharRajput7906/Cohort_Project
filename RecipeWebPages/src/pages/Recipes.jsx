import React, { useContext } from 'react'
import { recipecontext } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard';
const Recipes = () => {
  const { data } = useContext(recipecontext);

  // const recipes = data || []

  const renderRecipes = data.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe}/>
  ));

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.length > 0 ? renderRecipes : "No recipes found!"}
    </div>
  )
}

export default Recipes
