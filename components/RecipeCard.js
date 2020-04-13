import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getRecipe } from "../store/actions/recipeAction";

import { useSelector, useDispatch } from "react-redux";

const RecipeCard = ({ recipe }) => {
  const image = { uri: `https://spoonacular.com/recipeImages/${recipe.image}` };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const recipeInStore = useSelector((state) => state.recipe.recipe);
  const favourites = useSelector((state) =>
    state.favourites.recipes.find(
      (recipeInStore) => recipeInStore.id === recipe.id
    )
  );
  const isLoading = useSelector((state) => state.recipe.loading);

  const dispatchRecipe = (recipeId) => {
    dispatch(getRecipe(recipeId));
  };

  let dispatchedId = recipeInStore.id;

  const goToRecipe = (id) => {
    if (id === recipe.id) {
      navigation.navigate("Recipe", { recipeId: id });
    }
  };

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      goToRecipe(dispatchedId);
    }
  }, [dispatchedId]);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        dispatchRecipe(recipe.id.toString());
        goToRecipe(dispatchedId);
      }}
    >
      <ImageBackground source={image} style={styles.image}>
        {favourites && (
          <AntDesign
            name="heart"
            color="#2ca52c"
            size={30}
            style={styles.icon}
          />
        )}
        {isLoading && <ActivityIndicator size="large" />}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {recipe.title.length < 40
              ? recipe.title
              : recipe.title.substring(0, 40) + "..."}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Dimensions.get("screen").width * 0.05,
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height - 276,
    borderRadius: 25,
    top: 78,
    elevation: 8,
    backgroundColor: "#cecece",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 25,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 10,
  },
  titleWrapper: {
    padding: "7%",
    paddingTop: "5%",
    width: "100%",
    backgroundColor: "#00000080",
  },
  title: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
    textShadowColor: "#222",
    textShadowRadius: 20,
  },
});
