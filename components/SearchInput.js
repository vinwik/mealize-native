import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Keyboard,
  AsyncStorage,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import { colors } from "../colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { FadeIn } from "../animations/FadeIn";
import { Translate } from "../animations/Translate";
import { API_KEY } from "../env";

// FIREBASE
import * as firebase from "firebase";
import { firebaseConfig } from "../env";
import { TouchableOpacity } from "react-native-gesture-handler";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SearchInput = (props) => {
  const [search, setSearch] = useState("");
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

  const inputHandler = (enteredSearch) => {
    props.setSearch(enteredSearch);
    props.searchAutocomplete(enteredSearch);
  };

  const autocompleteHandler = (autocomplete) => {
    props.setSearch(autocomplete);
    props.searchAutocompleteHandler(autocomplete);
    setAutocompleteSearch([]);
    Keyboard.dismiss();
  };

  const submitHandler = () => {
    props.setModalVisible(false);
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
      return autocomplete.toLowerCase().startsWith(props.search.toLowerCase());
    })
    .sort((a, b) => a.length - b.length)
    .slice(0, 6);

  // console.log(filteredAutocomplete);
  // console.log(autocompleteSearch);

  return (
    <View
      style={[
        styles.searchBarContainer,
        {
          backgroundColor: props.modalVisible
            ? colors.paleGreen
            : colors.paleGreenSearch,
        },
      ]}
    >
      <View
        style={[
          styles.inputContainer,
          props.search.length &&
            autocompleteSearch.length &&
            styles.borderBottom,
        ]}
      >
        {props.modalVisible ? (
          <Translate
            start={0}
            end={-15}
            dependency={props.modalVisible}
            duration={350}
          >
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(false);
                Keyboard.dismiss();
              }}
            >
              <AntDesign
                name="left"
                size={20}
                color="#fff"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </Translate>
        ) : (
          <Translate
            start={-15}
            end={0}
            dependency={props.modalVisible}
            duration={350}
          >
            <AntDesign
              name="search1"
              size={20}
              color="#fff"
              style={styles.searchIcon}
            />
          </Translate>
        )}
        <TextInput
          placeholderTextColor="#ffffff80"
          selectionColor="#fff"
          placeholder={props.placeHolder}
          style={styles.input}
          onChangeText={inputHandler}
          value={props.search}
          onFocus={() => props.setModalVisible(true)}
          onBlur={() => props.setModalVisible(false)}
          onSubmitEditing={() => submitHandler()}
        />
        {props.search ? (
          <FadeIn duration={200}>
            <AntDesign
              name="close"
              size={20}
              color="#fff"
              style={styles.closeIcon}
              onPress={() => props.setSearch("")}
            />
          </FadeIn>
        ) : null}
      </View>

      {/* {autocompleteSearch &&
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
        })} */}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Dimensions.get("screen").width * 0.9,
    borderRadius: 8,
    alignSelf: "center",
    // position: "absolute",
    // top: 20,
    // elevation: 5,
    // marginTop: Platform.OS === "ios" ? -10 : 0,
    paddingVertical: Platform.OS === "ios" ? 8 : 2,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    zIndex: 10,
    overflow: "hidden",
  },
  inputContainer: {
    // backgroundColor: "#fff",
    // backgroundColor: colors.paleDarkGreen,

    // width: "90%",
    // borderRadius: 25,
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
    color: "#fff",
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
