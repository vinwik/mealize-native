import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { FadeIn } from "../animations/FadeIn";

const RecipeCardList = (props) => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const isLoading = useSelector((state) => state.recipe.loading);
  const searchValue = useSelector((state) => state.recipe.searchValue);
  const scroll = useRef();

  useEffect(() => {
    recipes.length &&
      scroll.current.scrollToOffset({ animated: true, offset: 0 });
  }, [recipes]);

  return (
    <View style={styles.cardListContainer}>
      {!isLoading && !recipes.length ? (
        <FadeIn
          delay={200}
          duration={300}
          style={{
            flex: 1,
            height: (Dimensions.get("screen").height + 40) / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {isLoading ? (
            <ActivityIndicator
              size={"large"}
              style={{ transform: [{ scale: 2 }] }}
            />
          ) : ( */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign name="warning" size={100} color={"#cecece"} />
            <Text
              style={{
                color: "#888",
                fontSize: 19,
                marginTop: 10,
              }}
            >{`No result found for :`}</Text>
            <Text
              style={{
                color: "#888",
                fontSize: 19,
                fontStyle: "italic",
              }}
            >{`"${searchValue}"`}</Text>
          </View>
          {/* )} */}
        </FadeIn>
      ) : (
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
      )}
    </View>
  );
};

export default RecipeCardList;

const styles = StyleSheet.create({
  cardListContainer: {
    flexDirection: "row",
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
