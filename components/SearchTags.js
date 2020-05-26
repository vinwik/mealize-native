import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../colors/colors";

const tags = [
  { name: "breakfast", category: "type" },
  { name: "dish", category: "type" },
  { name: "dessert", category: "type" },
  { name: "italian", category: "cuisine" },
  { name: "french", category: "cuisine" },
  { name: "chinese", category: "cuisine" },
];

const SearchTags = (props) => {
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState([]);

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

  const buttonMargin = (i) => {
    if (i === 0) {
      return styles.firstButton;
    }
    if (i === tags.length - 1) {
      return styles.lastButton;
    }

    return styles.button;
  };

  //   useEffect(() => {
  //     if (type || cuisine) {
  //       props.getSearch("", type, cuisine);
  //     }
  //   }, [type, cuisine]);

  return (
    <View style={styles.tags}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {tags.map((tag, i) => {
          return (
            <TouchableOpacity
              style={[
                buttonMargin(i),
                props.type.includes(tag.name) ||
                props.cuisine.includes(tag.name)
                  ? styles.pressedButtonBackground
                  : styles.buttonBackground,
              ]}
              key={tag.name}
              onPress={() => {
                props.tagsHandler(tag);
              }}
            >
              <Text style={{ color: "white", textTransform: "capitalize" }}>
                {tag.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchTags;

const styles = StyleSheet.create({
  tags: {
    // flex: 1,
    // position: "absolute",
    // top: Dimensions.get("screen").height - 258,
    // width: 100,
    // height: 100,
    // zIndex: 100,
    // paddingTop: 15,
  },
  button: {
    marginHorizontal: Dimensions.get("screen").width * 0.0125,
    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
  },
  firstButton: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    marginRight: Dimensions.get("screen").width * 0.0125,

    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
  },
  lastButton: {
    marginLeft: Dimensions.get("screen").width * 0.0125,
    marginRight: Dimensions.get("screen").width * 0.05,
    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
  },
  buttonBackground: {
    backgroundColor: colors.paleGreen,
  },
  pressedButtonBackground: {
    backgroundColor: colors.paleDarkGreen,
  },
});
