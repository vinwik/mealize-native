import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (ingredient) => async (dispatch) => {
  ingredient.inCart = true;
  await dispatch({
    type: ADD_TO_CART,
    payload: ingredient,
  });
};

export const removeFromCart = (id) => async (dispatch) => {
  await dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};
