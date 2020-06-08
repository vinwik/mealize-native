import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import CartScreen from "../screens/CartScreen/CartScreen";
import IngredientScreen from "../screens/CartScreen/IngredientScreen";
import RecipeScreen from "../screens/CartScreen/RecipeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { TransitionPresets } from "@react-navigation/stack";

import { AntDesign } from "@expo/vector-icons";

import { colors } from "../colors/colors";

const Stack = createSharedElementStackNavigator();

const CartStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Shopping Cart" headerMode="screen">
      <Stack.Screen
        name="Shopping Cart"
        component={CartScreen}
        options={{
          headerStyle: {
            // backgroundColor: "#276582",
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
        name="Ingredient"
        component={IngredientScreen}
        options={({ navigation, route }) => ({
          headerTransparent: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyle: {
            // backgroundColor: "#276582",
            backgroundColor: colors.paleGreen,
            // borderBottomColor: "#168916",
            // borderBottomWidth: 1,
            elevation: 10,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={showcase.leftIcon}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" color="black" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={() => ({
          headerTransparent: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}
      />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;

const showcase = StyleSheet.create({
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
