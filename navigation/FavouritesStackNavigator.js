import React from "react";
import { StyleSheet } from "react-native";

import FavouritesScreen from "../screens/FavouritesScreen";
import RecipeScreen from "../screens/RecipeScreen";

import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Favourites">
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2ca52c",
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
