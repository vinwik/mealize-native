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
              <Text style={{ color: "white" }}>{tag.name}</Text>
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
    position: "absolute",
    top: Dimensions.get("screen").height - 258,

    // width: 100,
    // height: 100,
    // zIndex: 100,
  },
  button: {
    marginHorizontal: Dimensions.get("screen").width * 0.0125,
    marginVertical: 20,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2ca52c",
    borderRadius: 25,
    elevation: 5,
  },
  firstButton: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    marginRight: Dimensions.get("screen").width * 0.0125,

    marginVertical: 20,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2ca52c",
    borderRadius: 25,
    elevation: 5,
  },
  lastButton: {
    marginLeft: Dimensions.get("screen").width * 0.0125,
    marginRight: Dimensions.get("screen").width * 0.05,
    marginVertical: 20,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2ca52c",
    borderRadius: 25,
    elevation: 5,
  },
  buttonBackground: {
    backgroundColor: "#2ca52c",
  },
  pressedButtonBackground: {
    backgroundColor: "#036a03",
  },
});
