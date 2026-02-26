import {createContext, useEffect, useState} from 'react'

export const recipecontext = createContext(null);

const RecipeContext = (props) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
      setData(JSON.parse(localStorage.getItem("recipes")) || []);
    },[]);

  return (
    <recipecontext.Provider value={{data, setData}}>{props.children}</recipecontext.Provider>
  )
}

export default RecipeContext



//  {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
//     title: "Paneer Butter Masala",
//     chef: "Chef Sanjeev Kapoor",
//     category:"dinner",
//     descriptions: "A rich and creamy North Indian curry made with paneer cubes in a buttery tomato gravy.",
//     ingredients: 
//       "250g paneer (cubed), 2 tbsp butter, 1 cup tomato puree, 1/2 cup fresh cream, 1 tsp ginger-garlic paste, 1 tsp garam masala, 1 tsp red chili powder, Salt to taste, Fresh coriander leaves"
//     ,
//     instructions: 
//       "Heat butter in a pan.Add ginger-garlic paste and sauté.Add tomato puree and cook until oil separates.Add spices and paneer.Stir in cream and simmer.Garnish and serve."
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
//     title: "Vegetable Biryani",
//     chef: "Chef Vikas Khanna",
//     category:"dinner",
//     descriptions: "A fragrant rice dish cooked with mixed vegetables and aromatic spices.",
//     ingredients: 
//       "2 cups basmati rice , 1 cup mixed vegetables , 1 sliced onion , 2 tbsp biryani masala , 1 tsp cumin seeds , 2 tbsp oil , Salt to taste , Mint leaves"
//     ,
//     instructions: 
//       "Soak rice for 30 minutes. Sauté cumin and onions. Add vegetables and spices. Add rice and water. Cook until done. Garnish and serve."
    
//   }