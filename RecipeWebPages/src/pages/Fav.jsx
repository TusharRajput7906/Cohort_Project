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
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Favourites</h1>
        <p className="mt-1 text-sm text-zinc-600">Recipes you’ve liked show up here.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favRecipes.length > 0
          ? favRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          : (
            <div className="sm:col-span-2 lg:col-span-3 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-200">
                <i className="ri-heart-3-line" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900">No favourites yet</h2>
              <p className="mt-1 text-sm text-zinc-600">Open a recipe card and tap the heart.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Fav;
