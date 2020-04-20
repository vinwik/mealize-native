import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { FadeIn } from "../animations/FadeIn";

const RecipeCardList = (props) => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const isLoading = useSelector((state) => state.recipe.loading);
  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollToOffset({ animated: true, offset: 0 });
  }, [recipes]);

  return (
    <View style={styles.cardListContainer}>
      {/* {isLoading && !recipes ? (
        <ActivityIndicator />
      ) : ( */}
      <FlatList
        horizontal
        ref={scroll}
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
        data={recipes}
        renderItem={({ item, index }) => (
          <RecipeCard recipe={item} i={index} length={recipes.length} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* )} */}
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
