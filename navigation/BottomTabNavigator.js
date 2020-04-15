import React from "react";
import { AntDesign } from "@expo/vector-icons";

import SearchRecipeScreen from "../screens/SearchRecipeScreen/SearchRecipeScreen";
import FavouritesScreen from "../screens/FavouritesScreen/FavouritesScreen";
import CartScreen from "../screens/CartScreen";

import MainStackNavigator from "./MainStackNavigator";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import CartStackNavigator from "./CartStackNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#2ca52c",
        }}
      >
        <Tab.Screen
          name="Search"
          component={MainStackNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesStackNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="hearto" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStackNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="shoppingcart" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
