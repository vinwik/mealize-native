import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
      <AntDesign name="search1" size={20} color="#8e8e8e" style={styles.icon} />
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
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  icon: {
    paddingLeft: 15,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    width: "100%",
  },
});
