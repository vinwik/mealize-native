import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors/colors";

import { useSelector, useDispatch } from "react-redux";

import { removeFromCart } from "../store/actions/cartAction";

const CartScreen = () => {
  const ingredients = useSelector((state) => state.cart.ingredients);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        {ingredients.map((ingredient) => {
          // const isInCart = cart.find(
          //   (ingredientInCart) => ingredientInCart.id === ingredient.id
          // );

          return (
            <View style={styles.rowContainer} key={ingredient.id}>
              <View style={styles.ingredientContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                    }}
                  />
                </View>
                <Text style={styles.ingredient}>{ingredient.name}</Text>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(ingredient.id))}
              >
                <AntDesign
                  name="minuscircle"
                  size={25}
                  color={colors.paleDarkRed}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  imageWrapper: {
    height: 60,
    width: 60,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 60,
    elevation: 8,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    borderRadius: 60,
  },
  ingredient: {
    // fontSize: 16,
    paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  icon: {
    borderRadius: 25,
    elevation: 5,
    backgroundColor: "#fff",
  },
});
