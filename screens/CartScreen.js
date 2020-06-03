import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../colors/colors";

import { useSelector, useDispatch } from "react-redux";

import { removeFromCart } from "../store/actions/cartAction";

import Swipeable from "react-native-gesture-handler/Swipeable";

const CartScreen = () => {
  const ingredients = useSelector((state) => state.cart.ingredients);
  const dispatch = useDispatch();

  ingredients.forEach((ingredient) => {
    ingredient.aisle = ingredient.aisle.substring(
      ingredient.aisle.lastIndexOf(";") + 1
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {!ingredients.length ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="shoppingcart" size={100} color={"#cecece"} />
          <Text
            style={{
              color: "#888",
              fontSize: 19,
              marginTop: 10,
            }}
          >{`Empty Cart`}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {ingredients
            .filter((v, i, a) => a.findIndex((t) => t.aisle === v.aisle) === i)
            .map((ingredient) => {
              const { aisle } = ingredient;

              return (
                <View
                  key={aisle}
                  style={{
                    backgroundColor: colors.backgroundColor,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 15,
                      alignSelf: "flex-start",
                    }}
                  >
                    {`${aisle} (${
                      ingredients.filter(
                        (ingredient) => ingredient.aisle === aisle
                      ).length
                    })`}
                  </Text>
                  <View>
                    {ingredients.map((filteredIngredient) => {
                      if (filteredIngredient.aisle === aisle) {
                        return (
                          <Swipeable
                            overshootRight={false}
                            renderRightActions={() => (
                              <TouchableOpacity
                                style={{
                                  backgroundColor: colors.paleDarkRed,
                                  alignItems: "flex-end",
                                  justifyContent: "center",
                                  padding: 20,
                                  marginVertical: 1,
                                }}
                                onPress={() =>
                                  dispatch(
                                    removeFromCart(filteredIngredient.id)
                                  )
                                }
                              >
                                <Text
                                  style={{ color: "#fff", fontWeight: "600" }}
                                >
                                  Delete
                                </Text>
                              </TouchableOpacity>
                            )}
                            key={filteredIngredient.id}
                          >
                            <View style={styles.rowContainer}>
                              <View style={styles.ingredientContainer}>
                                <View style={styles.imageWrapper}>
                                  <Image
                                    style={styles.image}
                                    source={{
                                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${filteredIngredient.image}`,
                                    }}
                                  />
                                </View>
                                <Text style={styles.ingredient}>
                                  {filteredIngredient.name}
                                </Text>
                              </View>

                              <TouchableOpacity
                                onPress={() =>
                                  dispatch(
                                    removeFromCart(filteredIngredient.id)
                                  )
                                }
                              >
                                <View style={styles.icon}>
                                  <Feather
                                    name="circle"
                                    size={25}
                                    style={styles.icon}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </Swipeable>
                        );
                      }
                    })}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "90%",
    width: Dimensions.get("screen").width,
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    backgroundColor: "#fff",
    marginVertical: 1,
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
    // backgroundColor: "#fff",
    // borderRadius: 60,
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    // borderRadius: 60,
  },
  ingredient: {
    // fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  icon: {
    // borderRadius: 25,
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // backgroundColor: "#fff",
  },
});
