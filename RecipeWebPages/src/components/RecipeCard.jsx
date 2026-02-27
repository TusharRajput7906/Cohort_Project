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
    <Link
      to={`/recipes/details/${id}`}
      className="group block relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
    >
      <div className="aspect-4/3 w-full overflow-hidden bg-white/5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-1 p-4">
        <h2 className="line-clamp-1 text-base font-semibold text-white">
          {title}
        </h2>
        <div className="absolute bottom-[16%] right-[5%]">
          <button
            type="button"
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            onClick={handleToggleFav}
            className={`grid h-9 w-9 place-items-center rounded-full text-xl transition-colors ${
              isFav
                ? "bg-red-500/20 text-red-300"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-red-300"
            }`}
          >
            <i className={isFav ? "ri-poker-hearts-fill" : "ri-poker-hearts-line"} />
          </button>
        </div>
        <p className="text-xs text-white/70">{chef}</p>

        <p className="text-sm text-white/80">
          {excerpt}
          {descriptions?.length > 100 ? "..." : ""} <span className="text-white/70">more</span>
        </p>
      </div>
    </Link>
  );
};

export default RecipeCard;
