import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";

const RecipeCardList = (props) => {
  const recipes = useSelector((state) => state.recipe.recipes);

  return (
    <View style={styles.cardListContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
        // data={props.recipes}
        data={recipes}
        renderItem={({ item, index }) => (
          // <RecipeCard recipe={item} i={index} length={props.recipes.length} />
          <RecipeCard recipe={item} i={index} length={recipes.length} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RecipeCardList;

const styles = StyleSheet.create({
  cardListContainer: {
    // flexDirection: "row",
    // height: "40%",
    // height: "100%",
    // width: "100%",
    // paddingLeft: "5%"
    position: "absolute",
    top: 58,
  },
  cardList: {
    // flexDirection: "row",
    // overflow: "scroll",
    // width: "100%"
    // height: 500
  },
});
