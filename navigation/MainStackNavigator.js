import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import SearchRecipeScreen from "../screens/SearchRecipeScreen/SearchRecipeScreen";
import RecipeScreen from "../screens/SearchRecipeScreen/RecipeScreen";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { useSelector } from "react-redux";
import { addToFavourites } from "../store/actions/favouritesAction";

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

const MainStackNavigator = () => {
  const isLoading = useSelector((state) => state.recipe.loading);

  return (
    <Stack.Navigator initialRouteName="Mealize">
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
            backgroundColor: "#2CA52C",
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
          const { recipeImage } = route.params;
          return [
            {
              id: recipeImage,
              animation: "move",
              resize: "none",
              align: "right-top",
            },
          ];
        }}
        options={({ navigation, route }) => ({
          // animationEnabled: false,

          headerTransparent: true,
          headerLeft: () => (
            <AntDesign
              name="left"
              color="black"
              size={24}
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
          ),
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
