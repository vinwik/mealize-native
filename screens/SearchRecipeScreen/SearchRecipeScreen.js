import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import SearchInput from "../../components/SearchInput";
import RecipeCardList from "../../components/RecipeCardList";
import SearchTags from "../../components/SearchTags";
import { API_KEY } from "../../env";

import { useSelector, useDispatch } from "react-redux";
import { searchRecipe } from "../../store/actions/recipeAction";

const SearchRecipeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState([]);

  const dispatch = useDispatch();

  const searchHandler = () => {
    if (search) {
      // getRecipes();
      dispatch(searchRecipe(search, type, cuisine));
      // setSearch("");
    } else {
      alert("Empty field");
    }
  };

  const tagsHandler = (tag) => {
    // console.log(tag.category);

    if (tag.category === "type") {
      if (!type.includes(tag.name)) {
        setType([...type, tag.name]);
      } else {
        const filteredType = type.filter((name) => {
          return name !== tag.name;
        });

        setType(filteredType);
      }
    }
    if (tag.category === "cuisine") {
      if (!cuisine.includes(tag.name)) {
        setCuisine([...cuisine, tag.name]);
      } else {
        const filteredCuisine = cuisine.filter((name) => {
          return name !== tag.name;
        });

        setCuisine(filteredCuisine);
      }
    }
  };

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${search}&instructionsRequired=true&cuisine=${cuisine}&type=${type}`
    );

    const data = await response.json();
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${search}&instructionsRequired=true&cuisine=${cuisine}&type=${type}`;
    console.log(url);

    setRecipes(data.results);
  };
  const getRandomRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=main dish`
    );

    const data = await response.json();

    setRecipes(data.recipes);
  };

  useEffect(() => {
    dispatch(searchRecipe(search, type, cuisine));
  }, [type, cuisine]);

  return (
    <View style={styles.screen}>
      <View>
        <SearchInput
          getSearch={getRecipes}
          search={search}
          setSearch={setSearch}
          searchHandler={searchHandler}
          placeHolder="Search Recipe..."
        />
      </View>
      <View>
        <RecipeCardList
          recipes={recipes}
          search={search}
          type={type}
          cuisine={cuisine}
        />
      </View>
      <View>
        <SearchTags
          getSearch={getRecipes}
          type={type}
          setType={setType}
          cuisine={cuisine}
          setCuisine={setCuisine}
          tagsHandler={tagsHandler}
        />
      </View>
    </View>
  );
};

export default SearchRecipeScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // alignItems: "center",
    // flexGrow: 1,
    // justifyContent: "space-evenly",
    // justifyContent: "center",
    // backgroundColor: "#e6e6e6",
    // height: "100%",
    // width: "100%",
  },
  suspense: {
    flex: 1,
  },
});
