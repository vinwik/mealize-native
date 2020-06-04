import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../colors/colors";

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
          activeTintColor: colors.paleGreen,
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
