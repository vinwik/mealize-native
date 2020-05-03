import { GET_RECIPE, GET_RECIPE_FROM_FAVOURITES, SET_LOADING } from "./types";
import { AsyncStorage } from "react-native";

// FIREBASE
import * as firebase from "firebase";
import { firebaseConfig } from "../../env";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { API_KEY } from "../../env";

export const searchRecipe = (search, type, cuisine) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  dispatch({
    type: "SEARCH_VALUE",
    payload: search,
  });

  const formattedSearch = `${search.toLowerCase()}-${type}-${cuisine}`;

  // await AsyncStorage.removeItem(`${search}-${type}-${cuisine}`);
  const value = await AsyncStorage.getItem(formattedSearch);
  const parsedRecipe = JSON.parse(value);

  const autocomplete = await AsyncStorage.getItem("autocompleteRecipe");
  const parsedAutocomplete = JSON.parse(autocomplete);

  const req = firebase.database().ref(`search/` + formattedSearch);
  const snapshot = await req.once("value");
  const val = snapshot.val();

  const req2 = firebase.database().ref(`autocomplete/`);
  const snapshot2 = await req2.once("value");
  const val2 = snapshot2.val();

  if (parsedRecipe !== null) {
    dispatch({
      type: "GET_SEARCH",
      payload: parsedRecipe,
    });

    const convertRecipe = await parsedRecipe.map((recipe) => recipe.title);
    if (parsedAutocomplete !== null) {
      const concatAutocomplete = await [
        ...convertRecipe,
        ...parsedAutocomplete,
      ];

      await AsyncStorage.setItem(
        `autocompleteRecipe`,
        JSON.stringify([...new Set(concatAutocomplete)])
      );
    } else {
      await AsyncStorage.setItem(`autocompleteRecipe`, JSON.stringify(val2));
    }
  } else if (val !== null) {
    dispatch({
      type: "GET_SEARCH",
      payload: val,
    });

    const convertRecipe = await val.map((recipe) => recipe.title);

    const concatAutocomplete = await [...convertRecipe, ...val2];

    await firebase
      .database()
      .ref("autocomplete/")
      .set([...new Set(concatAutocomplete)]);

    if (parsedRecipe === null) {
      await AsyncStorage.setItem(formattedSearch, JSON.stringify(val));
    }
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${search}&number=100&instructionsRequired=true&cuisine=${cuisine}&type=${type}`
    );

    const data = await response.json();

    await AsyncStorage.setItem(formattedSearch, JSON.stringify(data.results));

    await firebase
      .database()
      .ref(`search/` + formattedSearch)
      .set(data.results);

    dispatch({
      type: "GET_SEARCH",
      payload: data.results,
    });

    const convertRecipe = await data.results.map((recipe) => recipe.title);

    const concatAutocomplete = await [...convertRecipe, ...parsedAutocomplete];

    await firebase
      .database()
      .ref("autocomplete/")
      .set([...new Set(concatAutocomplete)]);

    if (parsedAutocomplete !== null) {
      const concatAutocomplete = await [
        ...convertRecipe,
        ...parsedAutocomplete,
      ];
      await AsyncStorage.setItem(
        `autocompleteRecipe`,
        JSON.stringify([...new Set(concatAutocomplete)])
      );
    } else {
      await AsyncStorage.setItem(`autocompleteRecipe`, JSON.stringify(val2));
    }
  }
};
export const getRecipe = (recipeId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  const value = await AsyncStorage.getItem(recipeId);
  const parsedRecipe = JSON.parse(value);

  const req = firebase.database().ref("recipe/" + recipeId);
  const snapshot = await req.once("value");
  const val = snapshot.val();

  if (parsedRecipe !== null) {
    dispatch({
      type: GET_RECIPE,
      payload: parsedRecipe,
    });
  } else if (val !== null) {
    dispatch({
      type: GET_RECIPE,
      payload: val,
    });

    if (parsedRecipe === null) {
      await AsyncStorage.setItem(recipeId, JSON.stringify(val));
    }
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();

    const transformedData = {
      ...data,
      steps: data.analyzedInstructions.length
        ? data.analyzedInstructions[0].steps
        : [],
    };

    await AsyncStorage.setItem(recipeId, JSON.stringify(transformedData));

    await firebase
      .database()
      .ref("recipe/" + recipeId)
      .set(transformedData);

    dispatch({
      type: GET_RECIPE,
      payload: transformedData,
    });
  }
};
export const getRecipeFromFavourites = (recipeId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  const value = await AsyncStorage.getItem(recipeId);
  const parsedRecipe = JSON.parse(value);

  if (parsedRecipe !== null) {
    dispatch({
      type: GET_RECIPE_FROM_FAVOURITES,
      payload: parsedRecipe,
    });
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();

    const transformedData = {
      ...data,
      steps: data.analyzedInstructions.length
        ? data.analyzedInstructions[0].steps
        : [],
    };

    await AsyncStorage.setItem(recipeId, JSON.stringify(transformedData));

    dispatch({
      type: GET_RECIPE_FROM_FAVOURITES,
      payload: transformedData,
    });
  }
};
