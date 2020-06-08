import {
  GET_RECIPE,
  GET_RECIPE_FROM_FAVOURITES,
  SET_LOADING,
} from "../actions/types";

const intitalState = {
  recipes: [],
  recipe: {
    extendedIngredients: [],
    steps: [],
  },
  favouriteRecipe: {
    extendedIngredients: [],
    steps: [],
  },
  ingredientRecipe: {
    extendedIngredients: [],
    steps: [],
  },
  loading: false,
  searchValue: "",
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case "SEARCH_VALUE":
      return {
        ...state,
        searchValue: payload,
      };
    case "GET_SEARCH":
      return {
        ...state,
        recipes: [...payload],

        loading: false,
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
    case "GET_RECIPE_FROM_INGREDIENTS":
      return {
        ...state,
        ingredientRecipe: payload,
        loading: false,
      };
    default:
      return state;
  }
}
