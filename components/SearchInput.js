import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const SearchInput = (props) => {
  const [search, setSearch] = useState("");

  const inputHandler = (enteredSearch) => {
    setSearch(enteredSearch);
  };

  const searchHandler = () => {
    if (search) {
      props.getSearch(search);
      setSearch("");
    } else {
      alert("Empty field");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={props.placeHolder}
        onChangeText={inputHandler}
        value={search}
        onSubmitEditing={searchHandler}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 25,
    position: "absolute",
    top: 20,
    elevation: 5,
    zIndex: 10,
  },
  input: {
    padding: 5,
    paddingHorizontal: 20,
  },
});
