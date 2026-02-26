import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { recipecontext } from '../context/RecipeContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SingleRecipe = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { data, setData } = useContext(recipecontext);
    const recipe = data.find((recipe) => String(recipe.id) === String(params.id));
    const { register, handleSubmit, reset } = useForm({
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

        toast.success("Recipe Deleted!");
        navigate("/recipes")
    }

    return (
        recipe ?
            <div className='w-full flex'>
                <div className="left w-1/2 p-2">
                    <img src={recipe.image} alt="" />
                    <h1>{recipe.title}</h1>
                </div>

                <form className="right w-1/2 p-2" onSubmit={handleSubmit(updateHandle)}>
                    <input
                        className="block border-b outline-0 p-2"
                        {...register("image")}
                        type="url"
                        // value={recipe.image}
                        placeholder="Enter image url"
                    />
                    <small className="text-red-300">This is how the error is shown</small>
                    <input
                        className="block border-b outline-0 p-2"
                        {...register("title")}
                        type="text"
                        // value={recipe.title}
                        placeholder="Recipe title"
                    />
                    <small className="text-red-300">This is how the error is shown</small>
                    <input
                        className="block border-b outline-0 p-2"
                        {...register("chef")}
                        type="text"
                        // value={recipe.chef}
                        placeholder="chef name"
                    />
                    <small className="text-red-300">This is how the error is shown</small>
                    <textarea
                        className="block border-b outline-0 p-2"
                        {...register("descriptions")}
                        // value={recipe.descriptions}
                        placeholder="//Start from here"
                    />
                    <small className="text-red-300">This is how the error is shown</small>
                    <textarea
                        className="block border-b outline-0 p-2"
                        {...register("instructions")}
                        // value={recipe.instructions}
                        placeholder="//Write instructions seperated by comma"
                    />
                    <small className="text-red-300">This is how the error is shown</small>
                    <textarea
                        className="block border-b outline-0 p-2"
                        {...register("ingredients")}
                        // value={recipe.ingredients}
                        placeholder="//Write ingredients seperated by comma"
                    />
                    <select
                        // value={recipe.category}
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
                    <button type="submit" className="mt-2 bg-blue-700 p-2 rounded">Update Recipe</button>
                    <button type="button" onClick={deleteHandler} className="mt-2 block bg-red-700 p-2 rounded">Delete Recipe</button>
                </form>

            </div>
            : "Loading..."
    )
}

export default SingleRecipe
