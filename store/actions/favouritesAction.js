import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./types";

export const addToFavourites = (recipe, recipeImage) => async (dispatch) => {
  recipe.image = recipeImage;
  recipe.inFavourites = true;
  await dispatch({
    type: ADD_TO_FAVOURITES,
    payload: recipe,
  });
};

export const removeFromFavourites = (id) => async (dispatch) => {
  await dispatch({
    type: REMOVE_FROM_FAVOURITES,
    payload: id,
  });
};
