import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getRecipe } from "../store/actions/recipeAction";
import { removeFromFavourites } from "../store/actions/favouritesAction";

const FavouritesScreen = () => {
  const recipes = useSelector((state) => state.favourites.recipes);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = (recipeId) => {
    navigation.navigate("Recipe", { recipeId });
  };

  const recipeInStore = useSelector((state) => state.recipe.recipe);

  const dispatchRecipe = (recipeId) => {
    dispatch(getRecipe(recipeId));
  };

  let dispatchedId = recipeInStore.id;

  const goToRecipe = (id) => {
    if (dispatchedId === id) {
      navigation.navigate("Recipe", { dispatchedId });
    }
  };

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      goToRecipe(dispatchedId);
    }
  }, [dispatchedId]);

  return (
    <ScrollView>
      {recipes.map((recipe) => {
        const image = { uri: `${recipe.image}` };

        return (
          <TouchableOpacity
            key={recipe.id}
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => {
              dispatchRecipe(recipe.id.toString());
              goToRecipe(recipe.id);
            }}
          >
            <ImageBackground source={image} style={styles.image}>
              <TouchableOpacity style={styles.deleteButton}>
                <AntDesign
                  name="close"
                  size={30}
                  color="black"
                  onPress={() => dispatch(removeFromFavourites(recipe.id))}
                />
              </TouchableOpacity>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                  {recipe.title.length < 30
                    ? recipe.title
                    : recipe.title.substring(0, 30) + "..."}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  card: {
    // margin: Dimensions.get("screen").width * 0.05,
    // width: Dimensions.get("screen").width * 0.4,
    height: Dimensions.get("screen").height * 0.25,
    // borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
    // borderRadius: 25,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    padding: 5,
    // shadowColor: "#222",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 8,
    // zIndex: 10,
  },
  titleWrapper: {
    padding: "2%",
    // paddingTop: "5%",
    width: "100%",
    backgroundColor: "#00000080",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "#222",
    textShadowRadius: 20,
  },
});
