import React from "react";
import CartScreen from "../screens/CartScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
            backgroundColor: "#2ca52c",
            backgroundColor: "#2CA52C",
            // borderBottomColor: "#168916",
            // borderBottomWidth: 1,
            elevation: 10,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;
