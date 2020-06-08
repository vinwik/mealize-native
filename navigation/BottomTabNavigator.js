import React from "react";
// import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../colors/colors";

import MainStackNavigator from "./MainStackNavigator";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import CartStackNavigator from "./CartStackNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarPosition="bottom"
            swipeEnabled={false}
            animationEnabled={false}
            tabBarOptions={{
              tabStyle: {
                height: 55,
                paddingBottom: 8,
                // paddingTop: 0,
                // justifyContent: "center",
              },
              labelStyle: {
                textTransform: "capitalize",
                fontSize: 12,
                margin: 2,
              },
              activeTintColor: colors.paleGreen,
              inactiveTintColor: "#8e8e8f",
              showIcon: true,
              indicatorStyle: {
                backgroundColor: colors.paleGreen,
                top: 0,
                // height: 0,
              },
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BottomTabNavigator;
