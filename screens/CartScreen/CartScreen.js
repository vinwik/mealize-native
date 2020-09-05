import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  // Animated,
  // Easing,
} from "react-native";

import Animated, { Easing } from "react-native-reanimated";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../colors/colors";

import { useSelector, useDispatch } from "react-redux";

import { addToCompleted } from "../../store/actions/cartAction";
import { cancelAddToCompleted } from "../../store/actions/cartAction";
import { removeFromCart } from "../../store/actions/cartAction";

import Swipeable from "react-native-gesture-handler/Swipeable";

const CartItem = ({ filteredIngredient, relatedRecipes }) => {
  const [isCompleted, setIsCompleted] = useState(filteredIngredient.completed);
  const [translate] = useState(new Animated.Value(-66));
  const [height] = useState(new Animated.Value(66));
  const [opacity] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const usUnit = filteredIngredient.measures.us;

  const filteredRelatedRecipe = relatedRecipes.filter(
    (recipe) => filteredIngredient.id === recipe.ingredientId
  );

  const isSameUnit = filteredRelatedRecipe.every(
    (relatedRecipeIngredient) =>
      relatedRecipeIngredient.unit === usUnit.unitShort
  );

  const totalAmount = filteredRelatedRecipe.reduce(
    (total, relatedRecipeIngredient) => {
      return total + relatedRecipeIngredient.amount;
    },
    0
  );

  const toggleCompleted = () => {
    Animated.timing(height, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      // useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(translate, {
      toValue: 66,
      easing: Easing.inOut(Easing.ease),
      duration: 350,
      useNativeDriver: true,
    }).start(() => setIsCompleted(!isCompleted));
  };

  const removeItem = () => {
    Animated.timing(height, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      // useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(translate, {
      toValue: -66,
      easing: Easing.inOut(Easing.ease),

      duration: 350,
      useNativeDriver: true,
    }).start(() => dispatch(removeFromCart(filteredIngredient.id)));
  };

  useEffect(() => {
    isCompleted === true
      ? dispatch(addToCompleted(filteredIngredient))
      : dispatch(cancelAddToCompleted(filteredIngredient));
  }, [isCompleted]);

  useLayoutEffect(() => {
    Animated.timing(height, {
      toValue: 66,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      // useNativeDriver: true,
    }).start();
    Animated.timing(translate, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      // useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      duration: 350,
      // useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Swipeable
      // overshootRight={false}
      onSwipeableLeftOpen={() =>
        // dispatch(removeFromCart(filteredIngredient.id))
        toggleCompleted()
      }
      onSwipeableRightOpen={() =>
        // dispatch(removeFromCart(filteredIngredient.id))
        removeItem()
      }
      renderLeftActions={(progress, dragX) => {
        {
          const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });
          if (!isCompleted) {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                // onPress={() => dispatch(removeFromCart(filteredIngredient.id))}
              >
                <View
                  style={{
                    backgroundColor: colors.paleGreen,
                    // alignItems: "flex-end",
                    justifyContent: "center",
                    paddingLeft: 20,
                    marginVertical: 1,
                    flex: 1,
                    // opacity: trans,
                  }}
                  // onPress={() => dispatch(removeFromCart(filteredIngredient.id))}
                >
                  <Feather
                    name={isCompleted ? "circle" : "check-circle"}
                    color="#fff"
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            );
          }
        }
      }}
      renderRightActions={(progress, dragX) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

        return (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            // onPress={() => dispatch(removeFromCart(filteredIngredient.id))}
          >
            <Animated.View
              style={{
                backgroundColor: colors.paleDarkRed,
                alignItems: "flex-end",
                justifyContent: "center",
                padding: 20,
                marginVertical: 1,
                flex: 1,
                // opacity: trans,
              }}
              // onPress={() => dispatch(removeFromCart(filteredIngredient.id))}
            >
              <Animated.Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  // transform: [{ translateX: trans }],
                }}
              >
                Delete
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      }}
      key={filteredIngredient.id}
    >
      <Animated.View
        style={{
          transform: [{ translateX: translate }],
          opacity: opacity,
          height: height,
        }}
      >
        <TouchableHighlight
          underlayColor="#fafafa"
          style={styles.rowContainer}
          onPress={() =>
            navigation.navigate("Ingredient", {
              ingredient: filteredIngredient,
            })
          }
        >
          <>
            <View style={styles.ingredientContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${filteredIngredient.image}`,
                  }}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.ingredient,
                    {
                      textDecorationLine: isCompleted ? "line-through" : "none",
                    },
                  ]}
                >
                  {filteredIngredient.name}
                </Text>
                {isSameUnit && (
                  <Text style={styles.unit}>
                    {`${totalAmount} ${usUnit.unitShort}`}
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                toggleCompleted();
              }}
            >
              <View style={styles.icon}>
                <Feather
                  name={isCompleted ? "check-circle" : "circle"}
                  color={isCompleted ? colors.paleGreen : "#444"}
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </>
        </TouchableHighlight>
      </Animated.View>
    </Swipeable>
  );
};

const CartScreen = () => {
  const ingredients = useSelector((state) => state.cart.ingredients);
  const relatedRecipes = useSelector((state) => state.cart.relatedRecipes);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  ingredients.forEach((ingredient) => {
    ingredient.aisle = ingredient.aisle.substring(
      ingredient.aisle.lastIndexOf(";") + 1
    );
  });

  const hasCompletedIngredients = ingredients.some(
    (ingredient) => ingredient.completed
  );

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
        <ScrollView>
          {ingredients
            .filter(
              (v, i, a) =>
                a.findIndex((t) => t.aisle === v.aisle && !t.completed) === i
            )
            .sort((a, b) => a.aisle.localeCompare(b.aisle))
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
                      if (
                        filteredIngredient.aisle === aisle &&
                        !filteredIngredient.completed
                      ) {
                        return (
                          <CartItem
                            key={filteredIngredient.id}
                            filteredIngredient={filteredIngredient}
                            relatedRecipes={relatedRecipes}
                          />
                        );
                      }
                    })}
                  </View>
                </View>
              );
            })}
          {hasCompletedIngredients && (
            <View
              style={{
                backgroundColor: colors.backgroundColor,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  padding: 15,
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  textAlign: "left",
                }}
              >
                {`Completed (${
                  ingredients.filter(
                    (ingredient) => ingredient.completed === true
                  ).length
                })`}
              </Text>
              <View>
                {ingredients.map((filteredIngredient) => {
                  if (filteredIngredient.completed === true) {
                    return (
                      <CartItem
                        key={filteredIngredient.id}
                        filteredIngredient={filteredIngredient}
                        relatedRecipes={relatedRecipes}
                      />
                    );
                  }
                })}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "90%",
    width: Dimensions.get("screen").width,
    // paddingHorizontal: Dimensions.get("screen").width * 0.05,
    backgroundColor: "#fff",
    marginVertical: 1,
    // borderRightWidth: 4,
    // borderRightColor: colors.paleDarkRed,
  },
  ingredientContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 10,
    // paddingHorizontal: Dimensions.get("screen").width * 0.05,
  },
  imageWrapper: {
    height: 60,
    width: 60,
    padding: 5,

    marginLeft: Dimensions.get("screen").width * 0.0375,
    marginRight: Dimensions.get("screen").width * 0.0375,
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
    fontSize: 16,
    fontWeight: "600",
    // paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  unit: {
    color: "#666",
    // fontWeight: "600",
    // paddingHorizontal: 10,
  },
  icon: {
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    flexGrow: 1,
    justifyContent: "center",
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
