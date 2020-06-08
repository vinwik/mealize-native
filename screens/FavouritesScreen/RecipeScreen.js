import React, { useState, useEffect, useLayoutEffect } from "react";
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
  Animated,
  Platform,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import Ingredients from "../../components/Ingredients";
import { colors } from "../../colors/colors";
import { AntDesign } from "@expo/vector-icons";

import { getRecipe } from "../../store/actions/recipeAction";
import { addToFavourites } from "../../store/actions/favouritesAction";
import { SharedElement } from "react-navigation-shared-element";
import { useSelector, useDispatch } from "react-redux";
import { FadeIn } from "../../animations/FadeIn";
import { BorderlessButton } from "react-native-gesture-handler";

const HEADER_EXPANDED_HEIGHT = Dimensions.get("screen").height * 0.45;

const RecipeScreen = ({ route, navigation }) => {
  const { recipeId, recipeImage, recipeTitle } = route.params;

  const recipe = useSelector((state) => state.recipe.favouriteRecipe);
  const { extendedIngredients, steps } = recipe;

  extendedIngredients.forEach((ingredient) => {
    ingredient.relatedRecipe = {
      id: recipeId,
      title: recipeTitle,
      image: recipeImage,
      ingredientId: ingredient.id,
      amount: ingredient.amount,
      unit: ingredient.measures.us.unitShort,
    };
  });

  const favourites = useSelector((state) =>
    state.favourites.recipes.find((recipe) => recipe.id === recipeId)
  );
  const cart = useSelector((state) => state.cart.ingredients);

  const dispatch = useDispatch();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const HEADER_COLLAPSED_HEIGHT = useHeaderHeight();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT * 2,
      HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const heroImageOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_EXPANDED_HEIGHT / 2,
      HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const heroTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

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
      headerLeft: () => (
        <TouchableOpacity
          style={showcase.leftIcon}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="left"
            color="black"
            size={24}
            // style={showcase.leftIcon}
          />
        </TouchableOpacity>
      ),
      title: recipeTitle,
      headerTitleStyle: {
        fontSize: 18,
        width: Dimensions.get("screen").width - 40 - 60 - 48,
        // fontWeight: "bold",
        // color: "black",
        opacity: headerTitleOpacity,
        textAlign: "center",
      },
      headerRight: () => (
        // <FadeIn duration={150} delay={300}>
        <TouchableOpacity
          style={showcase.rightIcon}
          disabled={favourites && favourites.inFavourites === true}
          onPress={() => dispatch(addToFavourites(recipe))}
        >
          <AntDesign
            name={favourites ? "heart" : "hearto"}
            color={favourites ? colors.paleGreen : "black"}
            size={24}
            // style={showcase.rightIcon}
          />
        </TouchableOpacity>
        // </FadeIn>
      ),
    });
  }, [navigation, favourites, recipe]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={showcase.showcaseWrapper}
        disabled={favourites && favourites.inFavourites === true}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          zIndex: 10,
          backgroundColor: "#fff",
          // elevation: 2,
          // opacity: heroLayerOpacity,
          // width: Dimensions.get("screen").width,
        }}
      >
        <Animated.View style={{ opacity: heroImageOpacity }}>
          <ImageBackground
            // source={{ uri: `${recipe.image}` }}
            source={{
              uri: `https://spoonacular.com/recipeImages/${recipeImage}`,
            }}
            style={showcase.image}
          >
            <Animated.View
              style={[showcase.titleWrapper, { opacity: heroTitleOpacity }]}
            >
              <Text style={showcase.title}>{recipeTitle}</Text>
            </Animated.View>
          </ImageBackground>
        </Animated.View>
      </Animated.View>
      {recipeId !== recipe.id ? (
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 35,
            marginTop: HEADER_EXPANDED_HEIGHT,
          }}
        >
          <FadeIn delay={300} duration={500}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 30,
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 25,
                  backgroundColor: "#d2d2d2",
                  borderRadius: 7,
                }}
              ></View>
              <View
                style={{
                  width: 100,
                  height: 25,
                  backgroundColor: "#d2d2d2",
                  borderRadius: 7,
                }}
              ></View>
            </View>
            <View
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "#d2d2d2",
                borderRadius: 7,
              }}
            ></View>
          </FadeIn>
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: HEADER_EXPANDED_HEIGHT,
          }}
        >
          <FadeIn duration={350}>
            <View style={preparation.layout}>
              <View style={preparation.column}>
                <Text style={preparation.title}>Servings</Text>
                <Text>{recipe.servings}</Text>
              </View>
              <View style={preparation.column}>
                <Text style={preparation.title}>Preparation time</Text>
                <Text>
                  {recipe.readyInMinutes && recipe.readyInMinutes + " min"}
                </Text>
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
                    <Text
                      style={stepSection.stepNumber}
                    >{`${step.number}. `}</Text>
                    <Text>{step.step}</Text>
                  </View>
                );
              })}
            </View>
          </FadeIn>
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default RecipeScreen;

const showcase = StyleSheet.create({
  showcaseWrapper: {
    // height: Dimensions.get("screen").height * 0.35,
    height: HEADER_EXPANDED_HEIGHT,
    backgroundColor: "#fff",
    // position: "relative",
    // elevation: 8, // not working
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // justifyContent: "flex-end",
    overflow: "hidden",
  },
  leftIcon: {
    // marginTop: 20,
    marginLeft: 20,
    borderRadius: 30,
    padding: 10,
    // elevation: 10,
    backgroundColor: "#fff",
  },
  rightIcon: {
    // marginTop: 20,
    marginRight: 20,
    borderRadius: 30,
    padding: 10,
    // elevation: 10,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    padding: "3%",
    paddingTop: "2%",
    width: "100%",
    backgroundColor: "#00000080",
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "#fff",
    fontSize: 18,
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
    // elevation: 5,
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
