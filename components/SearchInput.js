import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Keyboard,
  AsyncStorage,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FadeIn } from "../animations/FadeIn";
import { API_KEY } from "../env";

const SearchInput = (props) => {
  const [search, setSearch] = useState("");
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

  const inputHandler = (enteredSearch) => {
    props.setSearch(enteredSearch);
    searchAutocomplete(enteredSearch);
  };

  const autocompleteHandler = (autocomplete) => {
    props.setSearch(autocomplete);
    props.searchHandler();
    setAutocompleteSearch([]);
    Keyboard.dismiss();
  };

  const submitHandler = () => {
    props.searchHandler();
    setAutocompleteSearch([]);
  };

  const searchHandler = () => {
    if (search) {
      props.getSearch(search, "", "");
      setSearch("");
    } else {
      alert("Empty field");
    }
  };

  const searchAutocomplete = async (search) => {
    // const response = await fetch(
    //   `https://api.spoonacular.com/recipes/autocomplete?apiKey=${API_KEY}&number=6&query=${search}`
    // );
    const value = await AsyncStorage.getItem(`autocompleteRecipe`);
    const data = JSON.parse(value);

    // const data = await response.json();
    // console.log(data);
    setAutocompleteSearch(data);
  };

  const filteredAutocomplete = autocompleteSearch
    .filter((autocomplete) => {
      return autocomplete.toLowerCase().startsWith(props.search.toLowerCase());
    })
    .sort((a, b) => a.length - b.length)
    .slice(0, 6);

  // console.log(filteredAutocomplete);
  // console.log(autocompleteSearch);

  return (
    <View style={styles.searchBarContainer}>
      <View
        style={[
          styles.inputContainer,
          props.search.length &&
            autocompleteSearch.length &&
            styles.borderBottom,
        ]}
      >
        <AntDesign
          name="search1"
          size={20}
          color="#8e8e8e"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={props.placeHolder}
          onChangeText={inputHandler}
          value={props.search}
          onSubmitEditing={() => submitHandler()}
        />
        {props.search ? (
          <FadeIn duration={200}>
            <AntDesign
              name="close"
              size={20}
              color="#8e8e8e"
              style={styles.closeIcon}
              onPress={() => props.setSearch("")}
            />
          </FadeIn>
        ) : null}
      </View>
      {/* {autocompleteSearch &&
        autocompleteSearch.map((item) => {
          return (
            <TouchableHighlight
              key={item.id}
              underlayColor="#f2f2f2"
              onPress={() => autocompleteHandler(item.title)}
            >
              <Text style={styles.autocompleteItem}>{item.title}</Text>
            </TouchableHighlight>
          );
        })} */}
      {autocompleteSearch &&
        props.search.length > 0 &&
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
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute",
    top: 20,
    elevation: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    zIndex: 10,
    overflow: "hidden",
  },
  inputContainer: {
    backgroundColor: "#fff",
    // width: "90%",
    borderRadius: 25,
    // alignSelf: "center",
    // position: "absolute",
    // top: 20,
    // elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // zIndex: 10,
  },
  borderBottom: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#8e8e8e",
  },
  searchIcon: {
    paddingLeft: 15,
  },
  closeIcon: {
    paddingRight: 15,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    // width: "100%",
    flexGrow: 1,
  },
  autocompleteItem: {
    paddingVertical: 15,
    paddingLeft: 20,
    color: "#666",
    // width: "100%",
    // flexGrow: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: "#888",
  },
});
