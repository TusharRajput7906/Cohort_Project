import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const navigate = useNavigate();
    const { data, setData } = useContext(recipecontext);
    const { register, handleSubmit, reset } = useForm();
    function submitHandle(recipe) {
        recipe.preventDefault;
        recipe.id = nanoid();
        const copyData = [...data];
        copyData.push(recipe);
        setData(copyData);
        localStorage.setItem("recipes",JSON.stringify(copyData));
        // setData([...data, recipe]);

        toast.success("New Recipe Created!");
        reset();
        navigate("/recipes")
    }
    return (
        <div className="mx-auto max-w-2xl ">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create a recipe</h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Add an image, short description, and the steps/ingredients.
                </p>
            </div>

            <form onSubmit={handleSubmit(submitHandle)} className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-800">Image URL</label>
                        <input
                            {...register("image")}
                            type="url"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Recipe title</label>
                            <input
                                {...register("title")}
                                type="text"
                                placeholder="e.g., Paneer Butter Masala"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-800">Chef</label>
                            <input
                                {...register("chef")}
                                type="text"
                                placeholder="e.g., Chef Sanjeev Kapoor"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-800">Description</label>
                        <textarea
                            {...register("descriptions")}
                            placeholder="A rich and creamy curry made with paneer cubes..."
                        />
                        <p className="text-xs text-zinc-500">Keep it short — this shows on the recipe card.</p>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-800">Instructions</label>
                        <textarea
                            {...register("instructions")}
                            placeholder="Write instructions separated by comma"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-800">Ingredients</label>
                        <textarea
                            {...register("ingredients")}
                            placeholder="Write ingredients separated by comma"
                        />
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

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200"
                        >
                            Save recipe
                        </button>
                        <p className="text-xs text-zinc-500">Saved to localStorage</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;
