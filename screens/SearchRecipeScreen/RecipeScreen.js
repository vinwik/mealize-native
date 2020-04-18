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
import { AntDesign } from "@expo/vector-icons";

import { getRecipe } from "../../store/actions/recipeAction";
import { addToCart } from "../../store/actions/cartAction";
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
  const cart = useSelector((state) => state.cart.ingredients);

  const dispatch = useDispatch();

  const filterDuplicates = (ingredients) => {
    if (!ingredients.length) {
      return ingredients;
    }

    const list = [];

    ingredients.forEach((ingredient) => {
      const duplicate = list.find((l) => l.id === ingredient.id);
      if (!duplicate) {
        list.push(ingredient);
      }
    });

    return list;
  };

  const ingredients = filterDuplicates(extendedIngredients);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={favourites && favourites.inFavourites === true}
          onPress={() => dispatch(addToFavourites(recipe))}
        >
          <AntDesign
            name={favourites ? "heart" : "hearto"}
            color={favourites ? "#2ca52c" : "black"}
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
      <View style={ingredientSection.container}>
        <View>
          <Text style={ingredientSection.title}>Ingredients</Text>
        </View>
        {ingredients.map((ingredient, i) => {
          const isInCart = cart.find(
            (ingredientInCart) => ingredientInCart.id === ingredient.id
          );
          return (
            <View
              key={(ingredient.id, i)}
              style={
                i === ingredient.length - 1
                  ? ingredientSection.ingredientWrapperNoBorder
                  : ingredientSection.ingredientWrapper
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {ingredient.amount > ingredient.amount.toFixed(2)
                    ? ingredient.amount.toFixed(2) + " "
                    : ingredient.amount + " "}
                </Text>
                <Text>
                  {ingredient.measures.us.unitShort &&
                    ingredient.measures.us.unitShort.toLowerCase() + " "}
                </Text>
                <Text style={ingredientSection.ingredient}>
                  {ingredient.name}
                </Text>
              </View>
              <TouchableOpacity
                disabled={isInCart && isInCart.inCart === true}
                onPress={() => dispatch(addToCart(ingredient))}
              >
                <AntDesign
                  name="pluscircle"
                  size={30}
                  color={isInCart ? "#888" : "#2ca52c"}
                  style={ingredientSection.icon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
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
    position: "relative",
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
