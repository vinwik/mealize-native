import React from "react";
import CartScreen from "../screens/CartScreen/CartScreen";
import IngredientScreen from "../screens/CartScreen/IngredientScreen";
import RecipeScreen from "../screens/CartScreen/RecipeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../colors/colors";

const Stack = createStackNavigator();

const CartStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Shopping Cart">
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
        name="Recipe"
        component={RecipeScreen}
        options={() => ({
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;
