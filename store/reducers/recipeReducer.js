import {
  GET_RECIPE,
  GET_RECIPE_FROM_FAVOURITES,
  SET_LOADING,
} from "../actions/types";

const intitalState = {
  recipe: {
    extendedIngredients: [],
    steps: [],
  },
  favouriteRecipe: {
    extendedIngredients: [],
    steps: [],
  },
  loading: false,
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,

        loading: false,
      };
    case GET_RECIPE_FROM_FAVOURITES:
      return {
        ...state,
        favouriteRecipe: payload,
        loading: false,
      };
    default:
      return state;
  }
}
