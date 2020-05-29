import React from "react";
import { StyleSheet } from "react-native";

import FavouritesScreen from "../screens/FavouritesScreen/FavouritesScreen";
import RecipeScreen from "../screens/FavouritesScreen/RecipeScreen";

import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { colors } from "../colors/colors";

const Stack = createSharedElementStackNavigator();

const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favourites"
      // mode="modal"
      headerMode="screen"
      screenOptions={{
        useNativeDriver: true,
        // gestureEnabled: false,

        gestureEnabled: false,
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    >
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.paleGreen,
            // borderBottomColor: "#168916",
            // borderBottomWidth: 1,
            elevation: 10,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ navigation, route }) => ({
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default FavouritesStackNavigator;

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
