import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (ingredient) => async (dispatch) => {
  ingredient.inCart = true;
  await dispatch({
    type: ADD_TO_CART,
    payload: ingredient,
  });
};

export const removeFromCart = (ingredientId) => async (dispatch) => {
  await dispatch({
    type: REMOVE_FROM_CART,
    payload: ingredientId,
  });

  await dispatch({
    type: "REMOVE_ALL_RELATED_RECIPES",
    payload: ingredientId,
  });
};

export const addRelatedRecipe = (relatedRecipe) => async (dispatch) => {
  await dispatch({
    type: "ADD_RELATED_RECIPE",
    payload: relatedRecipe,
  });
};

export const removeRelatedRecipe = (ingredientId, recipeId) => async (
  dispatch
) => {
  await dispatch({
    type: "REMOVE_RELATED_RECIPE",
    payload: { ingredientId, recipeId },
  });
};
