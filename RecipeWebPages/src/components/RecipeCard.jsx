import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { id, image, title, descriptions, chef } = props.recipe;
  const excerpt = (descriptions ?? "").slice(0, 100);

  return (
    <Link
      to={`/recipes/details/${id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5"
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
