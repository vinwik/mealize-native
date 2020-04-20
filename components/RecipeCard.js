import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors } from "../colors/colors";
import { FadeIn } from "../animations/FadeIn";
import { AntDesign } from "@expo/vector-icons";
import { getRecipe } from "../store/actions/recipeAction";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";

import { useSelector, useDispatch } from "react-redux";

const RecipeCard = ({ recipe, i, length }) => {
  const navigation = useNavigation();

  const recipeInStore = useSelector((state) => state.recipe.recipe);
  const favourites = useSelector((state) =>
    state.favourites.recipes.find(
      (recipeInStore) => recipeInStore.id === recipe.id
    )
  );
  const isLoading = useSelector((state) => state.recipe.loading);

  const dispatch = useDispatch();

  const [card, setCard] = useState();

  const dispatchRecipe = (recipeId) => {
    dispatch(getRecipe(recipeId));
  };

  let dispatchedId = recipeInStore.id;

  const goToRecipe = (id) => {
    if (id === recipe.id) {
      setCard("");
      navigation.navigate("Recipe", {
        recipeId: id,
        recipeImage: recipe.image,
        recipeTitle: recipe.title,
      });
    }
  };

  const cardMargin = (i) => {
    if (i === 0) {
      return styles.firstCard;
    }
    if (i === length - 1) {
      return styles.lastCard;
    }

    return styles.card;
  };

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      goToRecipe(recipe.id);
    }
  }, [recipe.id]);

  return (
    <TouchableScale
      style={cardMargin(i)}
      // activeOpacity={0.8}
      activeScale={0.99}
      tension={1}
      friction={1}
      useNativeDriver
      onPress={() => {
        setCard(recipe.id);
        dispatchRecipe(recipe.id.toString());
        goToRecipe(recipe.id);
      }}
    >
      <SharedElement id={recipe.image}>
        <Image
          source={{
            uri: `https://spoonacular.com/recipeImages/${recipe.image}`,
          }}
          style={styles.image}
        />
        {/* <ImageBackground
          source={{
            uri: `https://spoonacular.com/recipeImages/${recipe.image}`,
          }}
          style={styles.image}
        >
          {favourites && (
            <AntDesign
              name="heart"
            color={colors.paleGreen}
              size={30}
              style={styles.icon}
            />
          )}
          {isLoading && card === recipe.id && (
            <FadeIn delay={600} duration={400} style={{ flex: 1 }}>
              <ActivityIndicator
                size="large"
                color="#77d477"
                style={{
                  flex: 1,
                  transform: [{ scale: 2 }],
                  backgroundColor: "#00000080",
                }}
              />
            </FadeIn>
          )}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {recipe.title.length < 40
                ? recipe.title
                : recipe.title.substring(0, 40) + "..."}
            </Text>
          </View>
        </ImageBackground> */}
      </SharedElement>
      {favourites && (
        <AntDesign
          name="heart"
          color={colors.paleGreen}
          size={30}
          style={styles.icon}
        />
      )}
      {isLoading && card === recipe.id && (
        <FadeIn delay={600} duration={400} style={{ flex: 1 }}>
          <ActivityIndicator
            size="large"
            color="#77d477"
            style={{
              flex: 1,
              transform: [{ scale: 2 }],
              backgroundColor: "#00000080",
            }}
          />
        </FadeIn>
      )}
      <SharedElement id={recipe.title}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {recipe.title.length < 40
              ? recipe.title
              : recipe.title.substring(0, 40) + "..."}
          </Text>
        </View>
      </SharedElement>
    </TouchableScale>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Dimensions.get("screen").width * 0.025,
    marginVertical: 20,
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height - 336,
    // height: Dimensions.get("screen").height * 0.6,
    // flexGrow: 1,
    borderRadius: 25,
    // top: 40,
    // top: 78,
    elevation: 8,
    overflow: "hidden",
    backgroundColor: "#cecece",
  },
  firstCard: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    marginRight: Dimensions.get("screen").width * 0.025,
    marginVertical: 20,
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height - 336,
    // height: Dimensions.get("screen").height * 0.6,
    // flexGrow: 1,
    borderRadius: 25,
    // top: 40,
    // top: 78,
    elevation: 8,
    overflow: "hidden",
    backgroundColor: "#cecece",
  },
  lastCard: {
    marginLeft: Dimensions.get("screen").width * 0.025,
    marginRight: Dimensions.get("screen").width * 0.05,
    marginVertical: 20,
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height - 336,
    // height: Dimensions.get("screen").height * 0.6,
    // flexGrow: 1,
    borderRadius: 25,
    // top: 40,
    // top: 78,
    elevation: 8,
    overflow: "hidden",
    backgroundColor: "#cecece",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 25,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 10,
  },
  titleWrapper: {
    padding: "7%",
    paddingTop: "5%",
    width: "100%",
    // height: "100%",
    backgroundColor: "#00000080",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
    textShadowColor: "#222",
    textShadowRadius: 20,
  },
});
