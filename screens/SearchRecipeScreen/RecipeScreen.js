import React, { useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ingredients from "../../components/Ingredients";
import { colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";

import { getRecipe } from "../../store/actions/recipeAction";
import { addToFavourites } from "../../store/actions/favouritesAction";
import { SharedElement } from "react-navigation-shared-element";
import { useSelector, useDispatch } from "react-redux";

const RecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const { recipeImage } = route.params;

  const recipe = useSelector((state) => state.recipe.recipe);
  const { extendedIngredients, steps } = recipe;

  const favourites = useSelector((state) =>
    state.favourites.recipes.find((recipe) => recipe.id === recipeId)
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={favourites && favourites.inFavourites === true}
          onPress={() => dispatch(addToFavourites(recipe))}
        >
          <AntDesign
            name={favourites ? "heart" : "hearto"}
            color={favourites ? colors.paleGreen : "black"}
            size={24}
            style={showcase.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, favourites, recipe]);

  return (
    <ScrollView>
      <TouchableOpacity
        style={showcase.showcaseWrapper}
        disabled={favourites && favourites.inFavourites === true}
        onPress={() => dispatch(addToFavourites(recipe))}
      >
        <SharedElement id={recipeImage}>
          <Image
            // source={{ uri: `${recipe.image}` }}
            source={{
              uri: `https://spoonacular.com/recipeImages/${recipeImage}`,
            }}
            style={showcase.image}
          />
          {/* <ImageBackground
            // source={{ uri: `${recipe.image}` }}
            source={{
              uri: `https://spoonacular.com/recipeImages/${recipeImage}`,
            }}
            style={showcase.image}
          >
            <View style={showcase.titleWrapper}>
              <Text style={showcase.title}>{recipe.title}</Text>
            </View>
          </ImageBackground> */}
        </SharedElement>
      </TouchableOpacity>
      <View style={preparation.layout}>
        <View style={preparation.column}>
          <Text style={preparation.title}>Servings</Text>
          <Text>{recipe.servings}</Text>
        </View>
        <View style={preparation.column}>
          <Text style={preparation.title}>Preparation time</Text>
          <Text>{recipe.readyInMinutes && recipe.readyInMinutes + " min"}</Text>
        </View>
      </View>
      <Ingredients extendedIngredients={extendedIngredients} />
      <View style={stepSection.container}>
        <View>
          <Text style={stepSection.title}>Instructions</Text>
        </View>
        {steps.map((step) => {
          return (
            <View key={step.number} style={stepSection.stepWrapper}>
              <Text style={stepSection.stepNumber}>{`${step.number}. `}</Text>
              <Text>{step.step}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;

// RecipeScreen.sharedElements = (navigation, otherNavigation, showing) => {
//   const item = navigation.getParam("recipeImage");
//   return [item];
// };

const showcase = StyleSheet.create({
  showcaseWrapper: {
    height: Dimensions.get("screen").height * 0.35,
    // position: "relative",
    elevation: 8, // not working
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  icon: {
    marginTop: 20,
    marginRight: 20,
    borderRadius: 30,
    padding: 10,
    elevation: 10,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    padding: "3%",
    paddingTop: "2%",
    width: "100%",
    backgroundColor: "#00000080",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textShadowColor: "#222",
    textShadowRadius: 20,
  },
});

const preparation = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  column: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  titleWrapper: {
    padding: "3%",
    paddingTop: "2%",
    width: "100%",
    backgroundColor: "#00000080",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
});

const ingredientSection = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingBottom: 20,
    paddingTop: 0,
  },
  // image: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "cover",
  //   justifyContent: "flex-end",
  //   overflow: "hidden",
  // },
  // titleWrapper: {
  //   padding: "3%",
  //   paddingTop: "2%",
  //   width: "100%",
  //   backgroundColor: "#00000080",
  // },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  ingredientWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "#444",
    paddingVertical: 10,
  },
  ingredientWrapperNoBorder: {
    flexDirection: "row",
  },
  ingredient: {
    fontWeight: "700",
    color: "#444",
    textTransform: "capitalize",
  },
  icon: {
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#fff",
  },
});

const stepSection = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingBottom: 20,
    paddingTop: 0,
  },
  // image: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "cover",
  //   justifyContent: "flex-end",
  //   overflow: "hidden",
  // },
  // titleWrapper: {
  //   padding: "3%",
  //   paddingTop: "2%",
  //   width: "100%",
  //   backgroundColor: "#00000080",
  // },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  stepWrapper: {
    flexDirection: "row",
    marginTop: 10,
    // justifyContent: "space-around",
  },
  stepNumber: {
    fontWeight: "700",
    color: "#444",
    position: "absolute",
    right: "100%",
  },
});
