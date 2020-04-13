import { GET_RECIPE } from "../actions/types";

const intitalState = {
  recipe: {
    extendedIngredients: [],
    steps: [],
  },
  loading: false,
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOADING":
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
    default:
      return state;
  }
}
