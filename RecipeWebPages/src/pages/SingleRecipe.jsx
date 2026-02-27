import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { recipecontext } from '../context/RecipeContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

const SingleRecipe = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { data, setData } = useContext(recipecontext);
    const recipe = data.find((recipe) => String(recipe.id) === String(params.id));
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: recipe?.title,
            image: recipe?.image,
            chef: recipe?.chef,
            descriptions: recipe?.descriptions,
            category: recipe?.category,
            instructions: recipe?.instructions,
            ingredients: recipe?.ingredients
        }
    });

    useEffect(() => {
        console.log("SingleRecipe.jsx is mounted");
        return () => {
            console.log("SingleRecipe.jsx is unmounted")
        }
    }, []);

    function updateHandle(recipe) {
        const recipeIndex = data.findIndex((recipe) => String(recipe.id) === String(params.id));
        const copyData = [...data];
        copyData[recipeIndex] = { ...copyData[recipeIndex], ...recipe };
        console.log(copyData[recipeIndex]);
        setData(copyData);
        localStorage.setItem("recipes",JSON.stringify(copyData));

        toast.success("Recipe Updated!")
    }

    const deleteHandler = () => {
        const filterdata = data.filter((recipe) => String(recipe.id) !== String(params.id));
        setData(filterdata);
        localStorage.setItem("recipes",JSON.stringify(filterdata));

        const favIds = readFavIds();
        const nextFavIds = favIds.filter((favId) => String(favId) !== String(params.id));
        writeFavIds(nextFavIds);

        toast.success("Recipe Deleted!");
        navigate("/recipes")
    }

    return (
        recipe ?
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                        <div className="aspect-4/3 bg-zinc-100">
                            <img className="h-full w-full object-cover" src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{recipe.title}</h1>
                                    <p className="mt-1 text-sm text-zinc-600">By {recipe.chef || "Unknown"}</p>
                                </div>
                                <div className="rounded-full bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
                                    {recipe.category || "Uncategorized"}
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-700">{recipe.descriptions}</p>
                        </div>
                    </div>
                </div>

                <form className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm" onSubmit={handleSubmit(updateHandle)}>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-zinc-900">Edit recipe</h2>
                        <p className="mt-1 text-sm text-zinc-600">Update fields and save changes.</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Image URL</label>
                            <input {...register("image")} type="url" placeholder="https://..." />
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-zinc-800">Title</label>
                                <input {...register("title")} type="text" placeholder="Recipe title" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-zinc-800">Chef</label>
                                <input {...register("chef")} type="text" placeholder="Chef name" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Description</label>
                            <textarea {...register("descriptions")} placeholder="Description" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Instructions</label>
                            <textarea {...register("instructions")} placeholder="Write instructions separated by comma" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Ingredients</label>
                            <textarea {...register("ingredients")} placeholder="Write ingredients separated by comma" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Category</label>
                            <select {...register("category")}>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="supper">Supper</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200"
                            >
                                Save changes
                            </button>
                            <button
                                type="button"
                                onClick={deleteHandler}
                                className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            : "Loading..."
    )
}

export default SingleRecipe
