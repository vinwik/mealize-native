import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableHighlight,
  Dimensions,
  Keyboard,
  Platform,
  AsyncStorage,
} from "react-native";
import FadeIn from "../../animations/FadeIn";
import { colors } from "../../colors/colors";
import SearchInput from "../../components/SearchInput";
import RecipeCardList from "../../components/RecipeCardList";
import SearchTags from "../../components/SearchTags";
import { API_KEY } from "../../env";

import { useHeaderHeight } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { searchRecipe } from "../../store/actions/recipeAction";

const SearchRecipeScreen = ({ navigation }) => {
  const height = useHeaderHeight();

  const [headerHeight, setHeaderHeight] = useState(height + 40);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

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
  const searchAutocompleteHandler = (autocomplete) => {
    dispatch(searchRecipe(autocomplete, type, cuisine));
    // setSearch("");
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
    // console.log(url);

    setRecipes(data.results);
  };
  const getRandomRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=main dish`
    );

    const data = await response.json();

    setRecipes(data.recipes);
  };

  const searchAutocomplete = async (search) => {
    const value = await AsyncStorage.getItem(`autocompleteRecipe`);
    const data = JSON.parse(value);
    setAutocompleteSearch(data);
    // const req2 = firebase.database().ref(`autocomplete/`);
    // const snapshot2 = await req2.once("value");
    // const val2 = snapshot2.val();
    // setAutocompleteSearch(val2);
  };

  const filteredAutocomplete = autocompleteSearch
    .filter((autocomplete) => {
      return autocomplete.toLowerCase().startsWith(search.toLowerCase());
    })
    .sort((a, b) => a.length - b.length)
    .slice(0, 6);

  const autocompleteHandler = (autocomplete) => {
    setSearch(autocomplete);
    searchAutocompleteHandler(autocomplete);
    setAutocompleteSearch([]);
    Keyboard.dismiss();
  };

  useEffect(() => {
    dispatch(searchRecipe(search, type, cuisine));
  }, [type, cuisine]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.paleGreen,
        height: headerHeight,
      },
      headerTitle: () => (
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              marginTop: Platform.OS === "ios" ? -10 : 0,
              marginBottom: 10,
            }}
          >
            Search
          </Text>
          <SearchInput
            getSearch={getRecipes}
            search={search}
            setSearch={setSearch}
            searchHandler={searchHandler}
            searchAutocompleteHandler={searchAutocompleteHandler}
            searchAutocomplete={searchAutocomplete}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            placeHolder="Search Recipe..."
          />
        </View>
      ),
    });
  }, [search, modalVisible]);

  return (
    <View style={styles.screen}>
      {modalVisible ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            // bottom: 0,
            left: 0,
            height: 1000,
          }}
        >
          {autocompleteSearch &&
            search.length > 0 &&
            filteredAutocomplete.map((item, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  underlayColor="#f2f2f2"
                  onPress={() => autocompleteHandler(item)}
                >
                  <Text style={styles.autocompleteItem}>{item}</Text>
                </TouchableHighlight>
              );
            })}
        </View>
      ) : (
        <>
          <View>
            {/* <SearchInput
          getSearch={getRecipes}
          search={search}
          setSearch={setSearch}
          searchHandler={searchHandler}
          searchAutocompleteHandler={searchAutocompleteHandler}
          placeHolder="Search Recipe..."
        /> */}
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
        </>
      )}
    </View>
  );
};

export default SearchRecipeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "center",
    // flexGrow: 1,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
    // marginTop: -25, //half of bottom bar
    // marginBottom: -5,
    // marginBottom: 49,
    // justifyContent: "center",
    // backgroundColor: "#e6e6e6",
    // height: "100%",
    // width: "100%",
  },
  suspense: {
    flex: 1,
  },
  autocompleteItem: {
    paddingVertical: 15,
    paddingLeft: Dimensions.get("screen").width * 0.05,
    color: "#666",
    // width: "100%",
    // flexGrow: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: "#888",
  },
});
