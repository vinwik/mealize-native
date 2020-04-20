import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import SearchRecipeScreen from "../screens/SearchRecipeScreen/SearchRecipeScreen";
import RecipeScreen from "../screens/SearchRecipeScreen/RecipeScreen";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors/colors";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { useSelector } from "react-redux";
import { addToFavourites } from "../store/actions/favouritesAction";
import { FadeIn } from "../animations/FadeIn";

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

const springConfig = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const timingConfig = {
  animation: "timing",
  config: {
    duration: 300,
  },
};

const MainStackNavigator = () => {
  const isLoading = useSelector((state) => state.recipe.loading);

  return (
    <Stack.Navigator
      initialRouteName="Mealize"
      // mode="modal"
      screenOptions={{
        useNativeDriver: true,
        // gestureEnabled: false,
        gestureEnabled: false,
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,

        transitionSpec: {
          open: timingConfig,
          close: timingConfig,
          // open: springConfig,
          // close: springConfig,
        },
      }}
    >
      <Stack.Screen
        name="Mealize"
        component={SearchRecipeScreen}
        // sharedElementsConfig={(route, otherRoute, showing) => {
        //   const { recipeImage } = route.params;
        //   return ["recipeImage"];
        // }}
        options={{
          // animationEnabled: false,
          headerStyle: {
            backgroundColor: colors.paleGreen,
            // borderBottomColor: "#168916",
            // borderBottomWidth: 1,
            elevation: 10,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerLeft: () =>
          //   isLoading && <ActivityIndicator size="large" color="#77d477" />,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { recipeImage, recipeTitle } = route.params;
          return [
            {
              id: recipeImage,
              animation: "move",
              // resize: "none",
              // align: "right-top",
            },
            {
              id: recipeTitle,
              animation: "fade",
              // resize: "none",
              // align: "right-top",
            },
          ];
        }}
        options={({ navigation, route }) => ({
          // animationEnabled: false,

          headerTransparent: true,
          // headerLeft: () => (
          //   <FadeIn duration={200} delay={350}>
          //     <AntDesign
          //       name="left"
          //       color="black"
          //       size={24}
          //       style={styles.icon}
          //       onPress={() => navigation.goBack()}
          //     />
          //   </FadeIn>
          // ),
          headerTitleStyle: {
            display: "none",
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({
  icon: {
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 25,
    padding: 10,
    elevation: 10,
    backgroundColor: "#fff",
  },
});
