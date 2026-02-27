import { useContext, useEffect, useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { recipecontext } from "../context/RecipeContext";

const FAV_STORAGE_KEY = "favRecipes";

const readFavIds = () => {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const Fav = () => {
  const { data } = useContext(recipecontext);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    const refresh = () => setFavIds(readFavIds());

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("favRecipesUpdated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("favRecipesUpdated", refresh);
    };
  }, []);

  const favRecipes = useMemo(() => {
    const favIdStrings = new Set(favIds.map((v) => String(v)));
    return (data || []).filter((recipe) => favIdStrings.has(String(recipe.id)));
  }, [data, favIds]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-white">Favourites</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favRecipes.length > 0
          ? favRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          : "No favourites yet!"}
      </div>
    </div>
  );
};

export default Fav;
