import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import SearchInput from "../../components/SearchInput";
import RecipeCardList from "../../components/RecipeCardList";
import { API_KEY } from "../../env";

const SearchRecipeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async (search) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${search}&instructionsRequired=true`
    );

    const data = await response.json();

    setRecipes(data.results);
  };

  return (
    <View style={styles.screen}>
      <SearchInput getSearch={getRecipes} placeHolder="Search Recipe..." />
      <RecipeCardList recipes={recipes} />
    </View>
  );
};

export default SearchRecipeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#e6e6e6",
    // height: "100%",
    // width: "100%"
  },
  suspense: {
    flex: 1,
  },
});
