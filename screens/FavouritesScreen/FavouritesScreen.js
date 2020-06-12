import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  // Animated,
  // Easing,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeFromFavourites } from "../../store/actions/recipeAction";
import { removeFromFavourites } from "../../store/actions/favouritesAction";

import Animated, { Easing } from "react-native-reanimated";

import Swipeable from "react-native-gesture-handler/Swipeable";

const HEIGHT = Dimensions.get("screen").height * 0.25;

const FavouriteItem = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dispatchRecipe = (recipeId) => {
    dispatch(getRecipeFromFavourites(recipeId));
  };

  const goToRecipe = (recipe) => {
    navigation.navigate("Recipe", {
      recipeId: recipe.id,
      recipeImage: recipe.image,
      recipeTitle: recipe.title,
    });
  };
  const [scale] = useState(new Animated.Value(HEIGHT));

  const removeItem = () => {
    Animated.timing(scale, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
    }).start(() => dispatch(removeFromFavourites(recipe.id)));
  };

  return (
    <Animated.View
      style={{
        height: scale,
      }}
    >
      <Swipeable
        // key={recipe.id}
        onSwipeableRightOpen={() => removeItem()}
        renderRightActions={(progress, dragX) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
              }}
            ></TouchableOpacity>
          );
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => {
            dispatchRecipe(recipe.id.toString());
            goToRecipe(recipe);
          }}
        >
          <ImageBackground
            source={{
              uri: `https://spoonacular.com/recipeImages/${recipe.image}`,
            }}
            style={styles.image}
          >
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {recipe.title.length < 30
                  ? recipe.title
                  : recipe.title.substring(0, 30) + "..."}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
};

const FavouritesScreen = () => {
  const recipes = useSelector((state) => state.favourites.recipes);
  const recipeInStore = useSelector((state) => state.recipe.favouriteRecipe);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dispatchRecipe = (recipeId) => {
    dispatch(getRecipeFromFavourites(recipeId));
  };

  let dispatchedId = recipeInStore.id;

  const goToRecipe = (recipe) => {
    navigation.navigate("Recipe", {
      recipeId: recipe.id,
      recipeImage: recipe.image,
      recipeTitle: recipe.title,
    });
  };

  const mounted = useRef();

  return (
    <View style={{ flex: 1 }}>
      {!recipes.length ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AntDesign name="hearto" size={100} color={"#cecece"} />
          <Text
            style={{
              color: "#888",
              fontSize: 19,
              marginTop: 10,
            }}
          >{`Empty Favourites`}</Text>
        </View>
      ) : (
        <ScrollView>
          {recipes.map((recipe) => {
            return <FavouriteItem key={recipe.id} recipe={recipe} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  card: {
    // margin: Dimensions.get("screen").width * 0.05,
    // width: Dimensions.get("screen").width * 0.4,
    height: HEIGHT,
    // borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
    // borderRadius: 25,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    padding: 5,
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 8,
    zIndex: 10,
  },
  titleWrapper: {
    padding: "2%",
    // paddingTop: "5%",
    width: "100%",
    backgroundColor: "#00000080",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "#222",
    textShadowRadius: 20,
  },
});
