import React from "react";
import { StyleSheet } from "react-native";
import SearchRecipeScreen from "../screens/SearchRecipeScreen";
import RecipeScreen from "../screens/RecipeScreen";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector, useDispatch } from "react-redux";
import { addToFavourites } from "../store/actions/favouritesAction";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Mealize">
      <Stack.Screen
        name="Mealize"
        component={SearchRecipeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2CA52C",
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
