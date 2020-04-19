import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors/colors";

import { addToCart } from "../store/actions/cartAction";

import { useSelector, useDispatch } from "react-redux";

const Ingredients = ({ extendedIngredients }) => {
  const cart = useSelector((state) => state.cart.ingredients);

  const dispatch = useDispatch();

  const filterDuplicates = (ingredients) => {
    if (!ingredients.length) {
      return ingredients;
    }

    const list = [];

    ingredients.forEach((ingredient) => {
      const duplicate = list.find((l) => l.id === ingredient.id);
      if (!duplicate) {
        list.push(ingredient);
      }
    });

    return list;
  };

  const ingredients = filterDuplicates(extendedIngredients);
  return (
    <View style={ingredientSection.container}>
      <View>
        <Text style={ingredientSection.title}>Ingredients</Text>
      </View>
      {ingredients.map((ingredient, i) => {
        const isInCart = cart.find(
          (ingredientInCart) => ingredientInCart.id === ingredient.id
        );
        return (
          <View
            key={(ingredient.id, i)}
            style={
              i === ingredient.length - 1
                ? ingredientSection.ingredientWrapperNoBorder
                : ingredientSection.ingredientWrapper
            }
          >
            <View style={{ flexDirection: "row" }}>
              <Text>
                {ingredient.amount > ingredient.amount.toFixed(2)
                  ? ingredient.amount.toFixed(2) + " "
                  : ingredient.amount + " "}
              </Text>
              <Text>
                {ingredient.measures.us.unitShort &&
                  ingredient.measures.us.unitShort.toLowerCase() + " "}
              </Text>
              <Text style={ingredientSection.ingredient}>
                {ingredient.name}
              </Text>
            </View>
            <TouchableOpacity
              disabled={isInCart && isInCart.inCart === true}
              onPress={() => dispatch(addToCart(ingredient))}
            >
              <AntDesign
                name="pluscircle"
                size={30}
                color={isInCart ? colors.disabled : colors.paleGreen}
                style={ingredientSection.icon}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Ingredients;

const ingredientSection = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingBottom: 20,
    paddingTop: 0,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  ingredientWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "#444",
    paddingVertical: 10,
  },
  ingredientWrapperNoBorder: {
    flexDirection: "row",
  },
  ingredient: {
    fontWeight: "700",
    color: "#444",
    textTransform: "capitalize",
  },
  icon: {
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#fff",
  },
});
