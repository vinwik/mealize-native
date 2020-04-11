import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import RecipeCard from "./RecipeCard";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const RecipeCardList = (props) => {
  // console.log(recipes);

  return (
    <View style={styles.cardListContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
        data={props.recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RecipeCardList;

const styles = StyleSheet.create({
  cardListContainer: {
    // flexDirection: "row",
    // height: "70%",
    height: "100%",
    width: "100%",
    // paddingLeft: "5%"
  },
  cardList: {
    // flexDirection: "row",
    // overflow: "scroll",
    // width: "100%"
    // height: 500
  },
});
