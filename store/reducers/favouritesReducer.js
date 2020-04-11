import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../actions/types";

const intitalState = {
  recipes: [],
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        recipes: [...state.recipes, payload],
      };
    case REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== payload),
      };
    default:
      return state;
  }
}
