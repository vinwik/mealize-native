import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const intitalState = {
  ingredients: [],
  relatedRecipes: [],
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      };
    case "ADD_TO_COMPLETED":
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === payload.id ? payload : ingredient
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== payload
        ),
      };
    case "ADD_RELATED_RECIPE":
      return {
        ...state,
        relatedRecipes: [...state.relatedRecipes, payload],
      };
    case "REMOVE_RELATED_RECIPE":
      return {
        ...state,
        relatedRecipes: [...state.relatedRecipes, payload],
      };
    case "REMOVE_ALL_RELATED_RECIPES":
      return {
        ...state,
        relatedRecipes: state.relatedRecipes.filter(
          (ingredient) => ingredient.ingredientId !== payload
        ),
      };
    default:
      return state;
  }
}
