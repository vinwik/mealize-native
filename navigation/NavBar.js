import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NavBar = () => {
  return (
    <View style={styles.navContainer}>
      <AntDesign name="filetext1" size={32} color="#333" />
      <AntDesign name="hearto" size={32} color="#333" />
      <AntDesign name="shoppingcart" size={32} color="#333" />
      <AntDesign name="user" size={32} color="#333" />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "white"
  }
});
