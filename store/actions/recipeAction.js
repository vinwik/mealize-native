import { GET_RECIPE, GET_RECIPE_FROM_FAVOURITES, SET_LOADING } from "./types";
import { AsyncStorage } from "react-native";

import { API_KEY } from "../../env";

export const searchRecipe = (search, type, cuisine) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  dispatch({
    type: "SEARCH_VALUE",
    payload: search,
  });

  // await AsyncStorage.removeItem(`${search}-${type}-${cuisine}`);
  const value = await AsyncStorage.getItem(`${search}-${type}-${cuisine}`);
  const parsedRecipe = JSON.parse(value);

  if (parsedRecipe !== null) {
    dispatch({
      type: "GET_SEARCH",
      payload: parsedRecipe,
    });
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${search}&number=100&instructionsRequired=true&cuisine=${cuisine}&type=${type}`
    );

    const data = await response.json();
    // console.log(data);

    await AsyncStorage.setItem(
      `${search}-${type}-${cuisine}`,
      JSON.stringify(data.results)
    );

    dispatch({
      type: "GET_SEARCH",
      payload: data.results,
    });
  }
};
export const getRecipe = (recipeId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  const value = await AsyncStorage.getItem(recipeId);
  const parsedRecipe = JSON.parse(value);

  if (parsedRecipe !== null) {
    dispatch({
      type: GET_RECIPE,
      payload: parsedRecipe,
    });
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();

    const transformedData = {
      ...data,
      steps: data.analyzedInstructions.length
        ? data.analyzedInstructions[0].steps
        : [],
    };

    await AsyncStorage.setItem(recipeId, JSON.stringify(transformedData));

    dispatch({
      type: GET_RECIPE,
      payload: transformedData,
    });
  }
};
export const getRecipeFromFavourites = (recipeId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  const value = await AsyncStorage.getItem(recipeId);
  const parsedRecipe = JSON.parse(value);

  if (parsedRecipe !== null) {
    dispatch({
      type: GET_RECIPE_FROM_FAVOURITES,
      payload: parsedRecipe,
    });
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();

    const transformedData = {
      ...data,
      steps: data.analyzedInstructions.length
        ? data.analyzedInstructions[0].steps
        : [],
    };

    await AsyncStorage.setItem(recipeId, JSON.stringify(transformedData));

    dispatch({
      type: GET_RECIPE_FROM_FAVOURITES,
      payload: transformedData,
    });
  }
};
