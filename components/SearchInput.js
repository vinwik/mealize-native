import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FadeIn } from "../animations/FadeIn";

const SearchInput = (props) => {
  const [search, setSearch] = useState("");

  const inputHandler = (enteredSearch) => {
    props.setSearch(enteredSearch);
  };

  const searchHandler = () => {
    if (search) {
      props.getSearch(search, "", "");
      setSearch("");
    } else {
      alert("Empty field");
    }
  };

  return (
    <View style={styles.inputContainer}>
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
        onSubmitEditing={props.searchHandler}
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
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute",
    top: 20,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
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
});
