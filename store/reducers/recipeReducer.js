import { GET_RECIPE } from "../actions/types";

const intitalState = {
  recipe: {
    extendedIngredients: [],
    steps: [],
  },
  loading: true,
};

export default function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
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
