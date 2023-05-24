import React, { createContext, useContext } from "react";
import { useRecipeReducer } from './reducers'

//This context will hold the state and provide it to the components that need it.
const RecipeContext = createContext();


const { Provider } = RecipeContext;

//wraps the components in which you want to use the state with the RecipeContext.Provider component. It receives an initialState object that defines the initial values for the state properties.


const RecipeProvider = ({ value = [], ...props }) => {
  const initialState = {
    categories: [],
    // areas,

    products: [],
    cart: [],
    cartOpen: false,

    currentCategory: "",
    category: "",
    area: "",
    ingredient: "",
    mealName: "",
  };

  // console.log("categories: ", initialState.categories);
  // console.log("areas: ", initialState.areas);

  //receives an initialState object that defines the initial values for the state properties.
  const [state, dispatch] = useRecipeReducer(initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

//allows components to access the state and dispatch function from the RecipeContext.

const useRecipeContext = () => {
    return useContext(RecipeContext);
};

export { RecipeProvider, useRecipeContext };