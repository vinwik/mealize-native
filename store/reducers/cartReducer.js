import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const intitalState = {
  ingredients: [],
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== payload
        ),
      };
    default:
      return state;
  }
}
