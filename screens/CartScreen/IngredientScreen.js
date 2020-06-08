import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../colors/colors";
import { FadeIn } from "../../animations/FadeIn";

import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeFromIngredients } from "../../store/actions/recipeAction";

import { removeFromCart } from "../../store/actions/cartAction";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableHighlight } from "react-native-gesture-handler";

const IngredientScreen = ({ route }) => {
  const { ingredient } = route.params;
  const navigation = useNavigation();

  const relatedRecipes = useSelector((state) => state.cart.relatedRecipes);

  const filteredRelatedRecipe = relatedRecipes.filter(
    (recipe) => ingredient.id === recipe.ingredientId
  );

  const isSameUnit = filteredRelatedRecipe.every(
    (relatedRecipeIngredient) =>
      relatedRecipeIngredient.unit === ingredient.measures.us.unitShort
  );

  const totalAmount = filteredRelatedRecipe.reduce(
    (total, relatedRecipeIngredient) => {
      return total + relatedRecipeIngredient.amount;
    },
    0
  );

  const dispatch = useDispatch();

  const goToRecipe = (recipe) => {
    dispatch(getRecipeFromIngredients(recipe.id.toString()));
    navigation.navigate("Recipe", {
      recipeId: recipe.id,
      recipeImage: recipe.image,
      recipeTitle: recipe.title,
    });
  };

  return (
    <ScrollView>
      <View // Set backgroundColor white for IOS scroll bounce
        style={{
          backgroundColor: "#fff",
          height: 1000,
          position: "absolute",
          top: -1000,
          left: 0,
          right: 0,
        }}
      />
      <FadeIn>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`,
            }}
          />
        </View>
      </FadeIn>
      <View style={styles.infoContainer}>
        <View style={styles.ingredientContainer}>
          <Text style={styles.ingredient}>{ingredient.name}</Text>
          {isSameUnit && (
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: 20, marginLeft: 5 }}>{totalAmount}</Text>
              <Text style={{ fontSize: 16, marginLeft: 5 }}>
                {ingredient.measures.us.unitShort}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.aisle}>{ingredient.aisle}</Text>
        <View
          style={{
            marginTop: Dimensions.get("screen").width * 0.1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Ingredient used in...
          </Text>
          {
            //   filteredRelatedRecipe &&
            filteredRelatedRecipe.map((recipe) => {
              return (
                <TouchableOpacity
                  key={recipe.id}
                  onPress={() => goToRecipe(recipe)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: Dimensions.get("screen").width * 0.05,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      //   flexGrow: 1,
                      //   marginTop: Dimensions.get("screen").width * 0.05,
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://spoonacular.com/recipeImages/${recipe.image}`,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                    <View
                      style={{
                        // flex: "wrap",
                        paddingHorizontal:
                          Dimensions.get("screen").width * 0.025,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                        }}
                      >
                        {recipe.title.length < 30
                          ? recipe.title
                          : recipe.title.substring(0, 30) + "..."}
                      </Text>
                      <Text
                        style={{ color: "#666" }}
                      >{`${recipe.amount} ${recipe.unit}`}</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={20} color="#888" />
                </TouchableOpacity>
              );
            })
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({
  rowContainer: {
    // flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // width: "90%",
    width: Dimensions.get("screen").width,
    // paddingHorizontal: Dimensions.get("screen").width * 0.05,
    backgroundColor: "#fff",
    marginVertical: 1,
    // borderRightWidth: 4,
    // borderRightColor: colors.paleDarkRed,
  },
  infoContainer: {
    // marginVertical: 10,
    padding: Dimensions.get("screen").width * 0.05,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    // justifyContent: "space-between",
    // marginVertical: 10,
    // paddingHorizontal: Dimensions.get("screen").width * 0.05,
  },
  imageWrapper: {
    backgroundColor: "#fff",
    // flex: 1,
    // height: 60,
    // width: 60,
    padding: Dimensions.get("screen").width * 0.1,

    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.35,
    // marginRight: Dimensions.get("screen").width * 0.0375,
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
    fontSize: 30,
    fontWeight: "600",
    // paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  aisle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    // paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  unit: {
    color: "#666",
    // fontWeight: "600",
    // paddingHorizontal: 10,
  },
  icon: {
    padding: Dimensions.get("screen").width * 0.05,

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
