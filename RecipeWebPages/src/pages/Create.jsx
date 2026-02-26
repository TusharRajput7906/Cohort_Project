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
        <form onSubmit={handleSubmit(submitHandle)}>
            <input
                className="block border-b outline-0 p-2"
                {...register("image")}
                type="url"
                placeholder="Enter image url"
            />
            <small className="text-red-300">This is how the error is shown</small>
            <input
                className="block border-b outline-0 p-2"
                {...register("title")}
                type="text"
                placeholder="Recipe title"
            />
            <small className="text-red-300">This is how the error is shown</small>
            <input
                className="block border-b outline-0 p-2"
                {...register("chef")}
                type="text"
                placeholder="chef name"
            />
            <small className="text-red-300">This is how the error is shown</small>
            <textarea
                className="block border-b outline-0 p-2"
                {...register("descriptions")}
                placeholder="//Start from here"
            />
            <small className="text-red-300">This is how the error is shown</small>
            <textarea
                className="block border-b outline-0 p-2"
                {...register("instructions")}
                placeholder="//Write instructions seperated by comma"
            />
            <small className="text-red-300">This is how the error is shown</small>
            <textarea
                className="block border-b outline-0 p-2"
                {...register("ingredients")}
                placeholder="//Write ingredients seperated by comma"
            />
            <select
                className="block border-b outline-0 p-2"
                {...register("category")}
            >
                <option className=" text-black" value="breakfast">
                    Breakfast
                </option>
                <option className=" text-black" value="lunch">
                    Lunch
                </option>
                <option className=" text-black" value="supper">
                    Supper
                </option>
                <option className=" text-black" value="dinner">
                    Dinner
                </option>
            </select>
            <button className="mt-2 bg-gray-900 p-2 rounded">Save Recipe</button>
        </form>
    );
};

export default Create;
