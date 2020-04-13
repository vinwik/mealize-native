import { GET_RECIPE } from "./types";
import { AsyncStorage } from "react-native";

import { API_KEY } from "../../env";

export const getRecipe = (recipeId) => async (dispatch) => {
  dispatch({
    type: "SET_LOADING",
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
