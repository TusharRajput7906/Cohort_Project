import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

const writeFavIds = (ids) => {
  localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("favRecipesUpdated"));
};

const RecipeCard = (props) => {
  const { id, image, title, descriptions, chef } = props.recipe;
  const excerpt = (descriptions ?? "").slice(0, 100);

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favIds = readFavIds();
    setIsFav(favIds.includes(id));
  }, [id]);

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favIds = readFavIds();
    const nextFavIds = favIds.includes(id)
      ? favIds.filter((favId) => favId !== id)
      : [...favIds, id];

    writeFavIds(nextFavIds);
    setIsFav(nextFavIds.includes(id));
  };


  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/recipes/details/${id}`}
        aria-label={`Open recipe: ${title}`}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="space-y-2 p-3 sm:p-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
            <p className="text-xs text-zinc-500">By {chef || "Unknown"}</p>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600">
            {excerpt}
            {descriptions?.length > 100 ? "..." : ""} <span className="text-zinc-500">Read more</span>
          </p>
        </div>
      </div>

      <div className="absolute right-3 top-3 z-20">
        <button
          type="button"
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          onClick={handleToggleFav}
          className={`grid h-10 w-10 place-items-center rounded-full text-xl shadow-sm ring-1 transition-colors ${
            isFav
              ? "bg-rose-50 text-rose-600 ring-rose-200"
              : "bg-white/90 text-zinc-700 ring-zinc-200 hover:bg-white"
          }`}
        >
          <i className={isFav ? "ri-heart-3-fill" : "ri-heart-3-line"} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
